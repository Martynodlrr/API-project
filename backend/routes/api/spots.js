const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { Sequelize } = require('sequelize');
const { formatDate } = require('../../utils/helperFunc.js')

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
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
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

  res.json({ message: "no spots created for current user"});
});

router.get('/:id/reviews', async (req, res) => {
  const { id } = req.params;

  let reviews = await Review.findAll({
    where: { spotId: id },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url'],
      }
    ],
  });

  if (!reviews.length) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  reviews = reviews.map(review => review.toJSON());
  reviews = reviews.map(review => {
    review.createdAt = formatDate(review.createdAt);
    review.updatedAt = formatDate(review.updatedAt);
    return review;
  });

  res.json({ Reviews: reviews });
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
      }
    ],
  });
console.log(spot)
  try {
    const reviews = await Review.findAll({
      where: { spotId: spot.id }
    });

    let avgRating = null;
    if (reviews.length > 0) {
      let totalStars = 0;
      for (const review of reviews) {
        totalStars += review.dataValues.stars;
      }
      avgRating = totalStars / reviews.length;
    }

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
      createdAt: new Date(spot.createdAt).toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: new Date(spot.updatedAt).toISOString().slice(0, 19).replace('T', ' '),
      numReviews: reviews.length,
      avgStarRating: avgRating,
      SpotImages: spot.SpotImages,
      Owner: spot.User,
    };

    return res.json(spotData);
  } catch {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
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


  const spot = await Spot.findOne({ where: { id: spotId } });

  if (spot && spot.ownerId !== user.id) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (spot) {
    try {
      const image = await SpotImage.create({ spotId, url, preview });
      const { createdAt, updatedAt, spotId: excludedSpotId, ...imageData } = image.dataValues;

      return res.json(imageData);
    } catch (err) {
      const errors = [];

      for (const key in err.errors) {
        if (err.errors[key].message.startsWith('Spot')) {
          errors.push(err.errors[key].message.slice(10));
        } else {
          errors.push(err.errors[key].message);
        }
      }

      return res.status(400).json({ errors });
    }

  }
  return res.status(404).json({ message: "Spot couldn't be found" });
});

router.post('/:spotId/reviews', async (req, res) => {
  const spotId = parseInt(req.params.spotId, 10);
  const { user } = req;
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    });
  }

  const existingReview = await Review.findOne({ where: { userId: user.id, spotId } });

  if (existingReview) {
    res.status(500).json({ message: "User already has a review for this spot" });
    return;
  }

  try {
    const newReview = await Review.create({
      userId: user.id,
      spotId,
      review,
      stars
    });
    return res.status(201).json(newReview);
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

router.put('/:spotId', async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (spot) {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (user.id === parseInt(spotId)) {
      try {
        await spot.update({ address, city, state, country, lat, lng, name, description, price });
        const updatedSpot = await Spot.findByPk(spotId);

        return res.json(updatedSpot);
      } catch (err) {
        const errors = [];

        for (const key in err.errors) {
          errors.push(err.errors[key].message);
        }

        return res.status(400).json({ errors });
      }
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } else {

    return res.status(404).json({ message: "Spot couldn't be found" });
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
