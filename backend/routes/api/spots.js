const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { Sequelize } = require('sequelize');

const transformSpotData = async (spots) => {
  const spotData = [];

  for (const spot of spots) {
    const {
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt,
    } = spot;

    const reviews = await Review.findAll({
      where: { spotId: spot.id },
      attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStars']],
    });

    let avgRating = null;
    if (reviews.length > 0) {
      let totalStars = 0;
      for (const review of reviews) {
        totalStars += review.dataValues.avgStars;
      }
      avgRating = totalStars / reviews.length;
    }

    let previewImage = null;
    if (spot.SpotImages.length > 0) {
      previewImage = spot.SpotImages[0].url;
    }

    const spotObj = {
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt: new Date(createdAt).toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: new Date(updatedAt).toISOString().slice(0, 19).replace('T', ' '),
      avgRating,
      previewImage,
    };

    spotData.push(spotObj);
  }

  return spotData;
};

router.get('/', async (req, res) => {
  const Spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
      },
      {
        model: Review,
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStars'],
        ],
      },
    ],
    group: ['Spot.id', 'SpotImages.id'],
  });

  const spotData = await transformSpotData(Spots);

  res.json({ Spots: spotData });
});

router.get('/current', async (req, res) => {
  const { user } = req;
  if (user) {
    const spot = await Spot.findByPk(user.id, {
      include: [
        {
          model: SpotImage,
          attributes: ['url'],
        },
        {
          model: Review,
          attributes: [
            [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStars'],
          ],
        },
      ],
      group: ['Spot.id', 'SpotImages.id'],
    });

    if (spot) {
      const spotData = await transformSpotData([spot]);
      return res.json({ Spots: spotData });
    }
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview'],
      },
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: Review,
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'numReviews']],
        separate: true,
        duplicating: false,
      },
      {
        model: Review,
        attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStarRating']],
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  const reviews = await Review.findAll({
    where: { spotId: spot.id },
    attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgStars']],
  });

  let avgRating = null;
  if (reviews.length > 0) {
    let totalStars = 0;
    for (const review of reviews) {
      totalStars += review.dataValues.avgStars;
    }
    avgRating = totalStars / reviews.length;
  }

  if (spot) {
    const spotData = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews: reviews.length,
      avgStarRating: avgRating,
      SpotImages: spot.SpotImages,
      Owner: spot.User,
    };

    return res.json({ Spots: spotData });
  }

  res.status(404).json({
    message: "Spot couldn't be found",
  });
});

router.post('/', async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (user) {
    try {
      const spot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      });
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

  return res.status(401).json({ message: 'Invalid credentials' });
});

router.post('/:spotId/images', async (req, res) => {
    const { user } = req;
    const spotId = req.params.spotId;
    const { url, preview } = req.body;

    const spot = await Spot.findOne({ where: { id: spotId, ownerId: user.id } });

    if (spot) {
        const image = await SpotImage.create({ spotId, url, preview });
        const { createdAt, updatedAt, spotId: excludedSpotId, ...imageData } = image.dataValues;

        return res.json(imageData);
      }

    return res.status(404).json({ message: "Spot couldn't be found" });
});

router.put('/:spotId', async (req, res) => {
    const { user } = req;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (user.id === parseInt(spotId)) {
        if (spot) {
            const { address, city, state, country, lat, lng, name, description, price } = req.body;

            try {
                await spot.update({ address, city, state, country, lat, lng, name, description, price });
                const updatedSpot = await Spot.findByPk(spotId);

                return res.json(updatedSpot);
            } catch (err) {
                const errors = [];

                for (const key in err.errors) {
                    errors.push(err.errors[key].message.slice(5));
                }

                return res.status(400).json({ message: 'Bad Request', errors });
            }
        }

        return res.status(404).json({ message: "Spot couldn't be found" });
    } else {

        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.delete('/:spotId', async (req, res) => {
    const { user } = req;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (user.id === spot.ownerId) {
        await spot.destroy();
        return res.json({ message: 'Successfully deleted' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
