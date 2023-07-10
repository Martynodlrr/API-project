const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { Sequelize } = require('sequelize');


router.get('/', async (req, res) => {
    const Spots = await Spot.findAll();
    res.json({Spots});
});

router.get('/current', async (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
        };
        const Spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        });
        return res.json({ Spots });
    }
    res.json();
});

router.get('/:spotId', async (req, res) => {
    const spotid = req.params.spotId;
    const spot = await Spot.findByPk(spotid);

    if (spot) {
        return res.json(spot);
    }

    res.status(404).json({
        "message": "Spot couldn't be found"
    });
});

router.post('/', async (req, res) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const errors = {};
    let spot;

    if (!address) {
        errors.address = "Street address is required"
    }
    if (!city) {
        errors.city = "City is required"
    }
    if (!state) {
        errors.state = "State is required"
    }
    if (!country) {
        errors.country = "Country is required"
    }
    if (!lat) {
        errors.lat = "Latitude is not valid"
    }
    if (!lng) {
        errors.lng = "Longitude is not valid"
    }
    if (!name) {
        errors.name = "Name must be less than 50 characters"
    }
    if (!description) {
        errors.description = "Description is required"
    }
    if (!price) {
        errors.price = "Price per day is required"
    }

    const length = Object.keys(errors).length;

    if (user) {
        try {
            spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });
            return res.status(201).json(spot);
          } catch (error) {
            if (error instanceof Sequelize.ValidationError) {
              return res.status(400).json({ error, errors });
            }
            return res.status(400).json({ "message": "Bad Request", errors });
          }
    }
    res.json()
});

module.exports = router;
