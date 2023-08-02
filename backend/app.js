const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');
const routes = require('./routes');

const app = express();

const setupMiddleware = (app) => {
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(express.json());

  if (environment === 'development') {
    app.use(cors());
  }

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  app.use(
    csurf({
      cookie: {
        secure: environment === 'production',
        sameSite: environment === 'production' ? 'Lax' : false,
        httpOnly: true,
      },
    })
  );

  app.use(routes);
};

const handleNotFoundError = (_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
};

const handleError = (err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: environment === 'production' ? null : err.stack,
  });
};

setupMiddleware(app);
app.use(handleNotFoundError);
app.use(handleError);

module.exports = app;
