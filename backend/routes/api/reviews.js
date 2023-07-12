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
        return res.json({ "message": "no spots created for current user" });
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
            errors.push(err.errors[key].message);
        }

        return res.status(400).json({ errors });
    }
});

router.put('/:reviewId', async (req, res) => {
    const { user } = req;
    const { reviewId } = req.params;
    const { review, stars } = req.body;

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
        await existingReview.update({ review, stars });
        const updatedReview = await Review.findByPk(reviewId);
        return res.json(updatedReview);
    } catch (err) {
        const errors = [];

        for (const key in err.errors) {
            if (err.errors[key].message.startsWith('Review')) {
                errors.push(err.errors[key].message.slice(7));
            } else {
                errors.push(err.errors[key].message);
            }
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
