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
        attributes: { exclude: ['createdAt', 'updatedAt'] },
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
        ]
    });

    if (!reviews.length) {
        return res.json({ "message": "no reviews for current user" });
    }

    const Reviews = reviews.map(review => {
        let user = {
            id: review.User.id,
            firstName: review.User.firstName,
            lastName: review.User.lastName
        };

        let previewImage = null;
        if (review.Spot.SpotImages.length > 0) {
            previewImage = review.Spot.SpotImages[0].url;
        }

        let spot = {
            id: review.Spot.id,
            ownerId: review.Spot.ownerId,
            address: review.Spot.address,
            city: review.Spot.city,
            state: review.Spot.state,
            country: review.Spot.country,
            lat: review.Spot.lat,
            lng: review.Spot.lng,
            name: review.Spot.name,
            price: review.Spot.price,
            previewImage: previewImage
        };

        let reviewImages = review.ReviewImages.map(image => {
            return {
                id: image.id,
                url: image.url
            };
        });

        return {
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            User: user,
            Spot: spot,
            ReviewImages: reviewImages
        };
    });

    res.json({ Reviews });
});

router.post('/:reviewId/images', async (req, res) => {
    const { user } = req;
    const { reviewId } = req.params;
    const { url } = req.body;

    if (!user) {
        return res.status(401).json({
            "message": 'Authentication required',
        });
    }

    const review = await Review.findByPk(reviewId, {
        include: [ReviewImage],
    });

    if (!review) {
        return res.status(404).json({ "message": "Review couldn't be found" });
    }

    if (review.ReviewImages.length >= 10) {
        return res.status(403).json({ "message": 'Maximum number of images for this review was reached' });
    }

    if (review.userId !== user.id) {
        return res.status(403).json({
            "message": 'Forbidden',
        });
    }

    try {
        const image = await ReviewImage.create({ reviewId: review.id, url });
        return res.json(image);
    } catch (err) {
        const errors = [];

        for (const key in err.errors) {
            if (err.errors[key].message.startsWith('ReviewImage')) {
              errors.push(err.errors[key].message.slice(12));
            } else {
              errors.push(err.errors[key].message);
            }
          }

        return res.status(400).json({ errors });
    }
});

router.put('/:reviewId', async (req, res) => {
    const { user } = req;
    const { reviewId } = req.params;
    const { review, stars } = req.body;
    const errors = [];

    if (!user) {
        return res.status(401).json({
            "message": 'Authentication required',
        });
    }

    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
        return res.status(404).json({ "message": "Review couldn't be found" });
    }

    if (existingReview.userId !== user.id) {
        return res.status(403).json({
            "message": 'Forbidden',
        });
    }

    if (!review) {
        return res.status(400).json({ "errors": "Review text is required" });
    }

    if (stars && stars > 5 || stars < 1) {
        return res.status(400).json({ "errors": "Stars must be an integer from 1 to 5" });
    }

    try {
        await existingReview.update({ review, stars });
        const updatedReview = await Review.findByPk(reviewId);
        return res.json(updatedReview);
    } catch (err) {

        for (const key in err.errors) {
                errors.push(err.errors[key].message);
            }

        return res.status(400).json({ errors });
    }
});

router.delete('/:reviewId', async (req, res) => {
    const { user } = req;
    const { reviewId } = req.params;

    if (!user) {
        return res.status(401).json({
            "message": 'Authentication required',
        });
    }

    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
        return res.status(404).json({ "message": "Review couldn't be found" });
    }

    if (existingReview.userId !== user.id) {
        return res.status(403).json({
            "message": 'Forbidden',
        });
    }

    try {
        await existingReview.destroy();
        return res.json({ "message": 'Successfully deleted' });
    } catch (err) {
        return res.status(500).json({ "message": 'Failed to delete the review' });
    }
});

module.exports = router;
