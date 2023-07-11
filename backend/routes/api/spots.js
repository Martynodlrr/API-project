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
    let spot;

    if (user) {
        try {
            spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });
            return res.status(201).json(spot);
        } catch (err) {
            const errors = [];

            for (const key in err.errors) {
                if (err.errors[key].message.startsWith('Spot')) {
                    errors.push(err.errors[key].message.slice(5));
                } else {
                    errors.push(err.errors[key].message);
                }
            }

            return res.status(400).json({ errors });
        }
    }

    return res.status(401).json({ "message": "Invalid credentials" });
});

module.exports = router;
