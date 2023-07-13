const express = require('express');
const router = express.Router();
const { Booking, Spot, SpotImage } = require('../../db/models');
const { formatDate } = require('../../utils/helperFunc.js');
const { Op } = require('sequelize');

router.get('/current', async (req, res) => {
    const { user } = req;

    if (!user) {
        return res.status(401).json({
            "message": 'Authentication required',
        });
    }
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url']
                    }
                ]
            }
        ]
    });

    if (!bookings.length) {
        return res.json({"message": "no bookings have been created"})
    }

    try {
        const formattedBookings = bookings.map(booking => ({
            id: booking.id,
            spotId: booking.spotId,
            Spot: {
                id: booking.Spot.id,
                ownerId: booking.Spot.ownerId,
                address: booking.Spot.address,
                city: booking.Spot.city,
                state: booking.Spot.state,
                country: booking.Spot.country,
                lat: booking.Spot.lat,
                lng: booking.Spot.lng,
                name: booking.Spot.name,
                price: booking.Spot.price,
                previewImage: booking.Spot.SpotImages.length > 0 ? booking.Spot.SpotImages[0].url : null
            },
            userId: booking.userId,
            startDate: formatDate(booking.startDate).slice(0, 10),
            endDate: formatDate(booking.endDate).slice(0, 10),
            createdAt: formatDate(booking.createdAt),
            updatedAt: formatDate(booking.updatedAt)
        }));

        return res.json({ Bookings: formattedBookings });
    } catch (err) {
        return res.status(500).json({ ...err });
    }
});

router.put('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    const { user, body } = req;
    const { startDate, endDate } = body;

    if (!user) {
        return res.status(401).json({
            "message": 'Authentication required'
        });
    }

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        });
    }

    if (booking.userId !== user.id) {
        return res.status(403).json({
            "message": "Booking doesn't belong to current user"
        });
    }

    if (new Date() > new Date(booking.endDate)) {
        return res.status(403).json({
            "message": "Past bookings can't be modified"
        });
    }

    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ "endDate": "endDate cannot come before startDate" });
    }

    const existingBooking = await Booking.findOne({
        where: {
            id: {
                [Op.ne]: bookingId
            },
            spotId: booking.spotId,
            startDate: {
                [Op.lte]: endDate
            },
            endDate: {
                [Op.gte]: startDate
            }
        }
    });

    if (existingBooking) {
        return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates"
        });
    }

    const updatedBooking = await booking.update({
        startDate,
        endDate
    });

    return res.json({
        id: updatedBooking.id,
        spotId: updatedBooking.spotId,
        userId: updatedBooking.userId,
        startDate: formatDate(updatedBooking.startDate).slice(0, 10),
        endDate: formatDate(updatedBooking.endDate).slice(0, 10),
        createdAt: formatDate(updatedBooking.createdAt),
        updatedAt: formatDate(updatedBooking.updatedAt)
    });
});

router.delete('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    const { user } = req;

    if (!user) {
        return res.status(401).json({ "message": "Authentication required" });
    }

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        return res.status(404).json({ "message": "Booking couldn't be found" });
    }

    const spot = await Spot.findByPk(booking.spotId);

    if (booking.userId !== user.id && spot.ownerId !== user.id) {
        return res.status(403).json({ "message": "Booking doesn't belong to current user or spot owner" });
    }

    if (new Date() > new Date(booking.startDate)) {
        return res.status(403).json({ "message": "Bookings that have been started can't be deleted" });
    }

    await booking.destroy();

    return res.status(200).json({ "message": "Successfully deleted" });
});

module.exports = router;
