const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { formatDate } = require('../../utils/helperFunc.js');
const {
  multipleMulterUpload,
  singleFileUpload,
  multipleFilesUpload  } = require("../../awsS3");

const transformSpotDataWithoutSpotId = (spots) => {
  const spotData = spots.map(spot => {
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
      SpotImages,
      Reviews
    } = spot;

    let avgRating = null;
    if (Reviews.length > 0) {
      const totalStars = Reviews.reduce((acc, review) => acc + review.stars, 0);
      avgRating = totalStars / Reviews.length;
    }

    const previewImage = SpotImages.length > 0 ? SpotImages[0].url : null;

    return {
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
      previewImage
    };
  });

  return { Spots: spotData };
};

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
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 20;
  const minLat = Number(req.query.minLat) || null;
  const maxLat = Number(req.query.maxLat) || null;
  const minLng = Number(req.query.minLng) || null;
  const maxLng = Number(req.query.maxLng) || null;
  const minPrice = Number(req.query.minPrice) || null;
  const maxPrice = Number(req.query.maxPrice) || null;

  if (page < 1 || page > 10) {
    return res.status(400).json({ "page": "Page must be greater than or equal to 1 and less than or equal to 10" });
  }

  if (size < 1 || size > 20) {
    return res.status(400).json({ "size": "Size must be greater than or equal to 1 and less than or equal to 20" });
  }

  const options = {
    offset: (page - 1) * size,
    limit: size,
    where: {},
    order: [['id', 'ASC']],
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
      },
      {
        model: Review,
        attributes: [],
        group: ['Review.spotId'],
      },
    ],
    group: ['Spot.id'],
  };

  if (minLat) options.where.lat = { [Op.gte]: minLat };
  if (maxLat) options.where.lat = { ...options.where.lat, [Op.lte]: maxLat };
  if (minLng) options.where.lng = { [Op.gte]: minLng };
  if (maxLng) options.where.lng = { ...options.where.lng, [Op.lte]: maxLng };
  if (minPrice) options.where.price = { [Op.gte]: minPrice };
  if (maxPrice) options.where.price = { ...options.where.price, [Op.lte]: maxPrice };

  const spots = await Spot.findAll(options);
  const spotData = await transformSpotData(spots);

  res.json({ spots: spotData, page, size });
});

router.get('/current', async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ "message": 'Invalid credentials' });
  }

  const spots = await Spot.findAll({
    where: { ownerId: user.id },
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
        order: ['createdAt'],
      },
      {
        model: Review,
        order: ['createdAt'],
      },
    ],
    group: ['Spot.id', 'SpotImages.id', 'Reviews.id']
  });

  if (spots && spots.length > 0) {
    const spotsData = spots.map(spot => {
      spot.dataValues.created_at = formatDate(spot.dataValues.created_at);
      return spot.dataValues;
    });
    return res.json({ Spots: spotsData });
  }

  return res.status(404).json({ "message": "no spots created for current user" });
});

router.get('/:spotId/bookings', async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({ "message": 'Authentication required' });
  }

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ "message": "Spot couldn't be found" });
  }

    const bookings = await Booking.findAll({
      where: { spotId },
      include: spot.ownerId === user.id ? { model: User, attributes: ['id', 'firstName', 'lastName'] } : [],
    });

    const formattedBookings = bookings.map(booking => {
      if (booking.userId === user.id) {
        let bookingData = {
          id: booking.id,
          spotId: booking.spotId,
          userId: booking.userId,
          startDate: formatDate(booking.startDate).slice(0, 10),
          endDate: formatDate(booking.endDate).slice(0, 10),
          createdAt: formatDate(booking.createdAt),
          updatedAt: formatDate(booking.updatedAt),
        };

        if (booking.User) {
          bookingData = { User: booking.User, ...bookingData };
        }

        return bookingData;
      } else {
        return {
          spotId: booking.spotId,
          startDate: formatDate(booking.startDate).slice(0, 10),
          endDate: formatDate(booking.endDate).slice(0, 10),
        };
      }
    });

    return res.status(200).json({ Bookings: formattedBookings });
});

router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

  let reviews = await Review.findAll({
    where: { spotId },
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
    return res.status(404).json({ "message": "No reviews" });
  }

  let Reviews = reviews.map(review => {
    let user = {
      id: review.User.id,
      firstName: review.User.firstName,
      lastName: review.User.lastName
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
      createdAt: formatDate(review.createdAt),
      updatedAt: formatDate(review.updatedAt),
      User: user,
      ReviewImages: reviewImages
    };
  });

  res.json({ Reviews });
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

    const Spots = {
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
      numReviews: reviews.length,
      avgStarRating: avgRating,
      SpotImages: spot.SpotImages,
      Owner: spot.User,
    };

    return res.json({ Spots });
  } catch {
    res.status(404).json({
      "message": "Spot couldn't be found",
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
        lat: lat ? lat : null,
        lng: lng ? lng : null,
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

  return res.status(401).json({ "message": 'Invalid credentials' });
});

router.post('/:spotId/images', multipleMulterUpload("image"), async (req, res) => {
  const spotId = req.params.spotId;

  let imageUrls;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images provided." });
  }

  if (req.files.length === 1) {
    const url = await singleFileUpload({ file: req.files[0], public: true });
    imageUrls = [url];
  } else if (req.files.length > 1) {
    imageUrls = await multipleFilesUpload({ files: req.files, public: true });
  }

  const images = await Promise.all(imageUrls.map(url => {
    return SpotImage.create({ spotId, url, preview: false });
  }));

  const responseData = images.map(img => {
    const { createdAt, updatedAt, spotId: excludedSpotId, ...imageData } = img.dataValues;
    return imageData;
  });

  return res.json(responseData);
});

router.post('/:spotId/reviews', async (req, res) => {
  const spotId = parseInt(req.params.spotId, 10);
  const { user } = req;
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    });
  }

  if (!user) {
    return res.status(401).json({
      "message": "Authentication required"
    });
  }

  const existingReview = await Review.findOne({ where: { userId: user.id, spotId } });

  if (existingReview) {
    res.status(500).json({ "message": "User already has a review for this spot" });
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

router.post('/:spotId/bookings', async (req, res) => {
  const { spotId } = req.params;
  const { user, body } = req;
  const { startDate, endDate } = body;

  if (!user) {
    return res.status(401).json({
      "message": 'Authentication required'
    });
  }

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    });
  }

  if (spot.ownerId === user.id) {
    return res.status(403).json({
      "message": "Cannot book own spot"
    });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ "endDate": "endDate cannot be on or before startDate" });
  }

  const existingBooking = await Booking.findOne({
    where: {
      spotId,
      startDate: {
        [Op.lte]: endDate
      },
      endDate: {
        [Op.gte]: startDate
      }
    }
  });

  if (existingBooking) {
    return res.status(403).json({
      "message": "Sorry, this spot is already booked for the specified dates"
    });
  }

  const newBooking = await Booking.create({
    spotId,
    userId: user.id,
    startDate,
    endDate,
  });

  return res.json({
    id: newBooking.id,
    spotId: newBooking.spotId,
    userId: newBooking.userId,
    startDate: formatDate(newBooking.startDate).slice(0, 10),
    endDate: formatDate(newBooking.endDate).slice(0, 10),
    createdAt: formatDate(newBooking.createdAt),
    updatedAt: formatDate(newBooking.updatedAt)
  });
});

router.put('/:spotId', async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (spot) {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (user.id === spot.ownerId) {
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

    return res.status(401).json({ "message": 'Invalid credentials' });
  } else {

    return res.status(404).json({ "message": "Spot couldn't be found" });
  }
});

router.delete('/:spotId', async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ "message": "Spot couldn't be found" });
  }

  if (user.id === spot.ownerId) {
    await spot.destroy();

    const remainingSpots = await Spot.findAll({ where: { ownerId: user.id } });
    const noSpotsLeft = remainingSpots.length === 0;

    return res.json({ "message": 'Successfully deleted', "noSpotsLeft": noSpotsLeft });
  }

  res.status(401).json({ "message": 'Invalid credentials' });
});

module.exports = router;
