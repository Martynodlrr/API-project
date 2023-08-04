const express = require('express');
const router = express.Router();
const { SpotImage, Review } = require('../../db/models');

router.delete('/:reviewImageId', async (req, res) => {
    const { reviewImageId } = req.params;
    const { user } = req;

    if (!user) {
        return res.status(401).json({ "message": "Authentication required" });
    }

    const spotImage = await SpotImage.findByPk(reviewImageId);

    if (!spotImage) {
        return res.status(404).json({ "message": "Spot Image couldn't be found" });
    }

    const review = await Review.findByPk(spotImage.reviewId);

    if (!review) {
        return res.status(404).json({ "message": "Review couldn't be found" });
    }

    if (review.userId !== user.id) {
        return res.status(403).json({ "message": "Review doesn't belong to current user" });
    }

    await spotImage.destroy();

    return res.json({ "message": "Successfully deleted" });
});

module.exports = router;
