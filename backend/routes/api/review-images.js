const express = require('express');
const router = express.Router();
const { ReviewImage, Review } = require('../../db/models');

router.delete('/:reviewImageId', async (req, res) => {
    const { reviewImageId } = req.params;
    const { user } = req;

    if (!user) {
        return res.status(401).json({ "message": "Authentication required" });
    }

    const reviewImage = await ReviewImage.findByPk(reviewImageId);

    if (!reviewImage) {
        return res.status(404).json({ "message": "Review Image couldn't be found" });
    }

    const review = await Review.findByPk(reviewImage.reviewId);

    if (!review) {
        return res.status(404).json({ "message": "Review couldn't be found" });
    }

    if (review.userId !== user.id) {
        return res.status(403).json({ "message": "Review doesn't belong to current user" });
    }

    await reviewImage.destroy();

    return res.json({ "message": "Successfully deleted" });
});

module.exports = router;
