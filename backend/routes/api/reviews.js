const express = require('express');
const router = express.Router();
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { Sequelize } = require('sequelize');
const { formatDate } = require('../../utils/helperFunc.js');

router.get('/current', async (req, res) => {
    const { user } = req;

    if (!user) {
        return res.status(401).json({
            "message": "Authentication required"
        });
    }

    let reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url'],
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
            }
        ],
    });

    if (!reviews.length) {
        return res.json({ message: "no spots created for current user" });
    }

    reviews = reviews.map(review => review.toJSON());
    reviews = reviews.map(review => {
        review.createdAt = formatDate(review.createdAt);
        review.updatedAt = formatDate(review.updatedAt);

        if (review.Spot && review.Spot.SpotImages && review.Spot.SpotImages.length > 0) {
            review.Spot.previewImage = review.Spot.SpotImages[0].url;
            delete review.Spot.SpotImages;
        }

        return review;
    });

    res.json({ Reviews: reviews });
});

module.exports = router;
