const express = require('express');
const router = express.Router();

const { SpotImage, Spot } = require('../../db/models');
const {
    multipleMulterUpload,
    singleFileUpload  } = require("../../awsS3");

router.put('/:spotImageId', multipleMulterUpload("image"), async (req, res) => {
    const { spotImageId } = req.params;
    const { user } = req;

    if (!user) {
        return res.status(401).json({ "message": "Authentication required" });
    }

    const spotImage = await SpotImage.findByPk(spotImageId);

    if (!spotImage) {
        return res.status(404).json({ "message": "Spot Image couldn't be found" });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ "message": "No images provided" });
    }

    const updatedUrl = await singleFileUpload({ file: req.files[0], public: true });

    spotImage.url = updatedUrl;

    try {
        await spotImage.save();
        return res.status(200).json({ "message": "Successfully updated" });
    } catch (err) {
        return res.status(500).json({ "message": "Failed to update", "error": err.message });
    }
});

router.delete('/:spotImageId', async (req, res) => {
    const { spotImageId } = req.params;
    const { user } = req;

    if (!user) {
      return res.status(401).json({ "message": "Authentication required" });
    }

    const spotImage = await SpotImage.findByPk(spotImageId);

    if (!spotImage) {
        return res.status(404).json({ "message": "Spot Image couldn't be found" });
    }

    const spot = await Spot.findByPk(spotImage.spotId);

    if (!spot) {
        return res.status(404).json({ "message": "Spot couldn't be found" });
    }

    await spotImage.destroy();

    return res.status(200).json({ "message": "Successfully deleted" });
});

module.exports = router;
