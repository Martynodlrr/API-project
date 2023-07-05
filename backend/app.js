const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const app = express();
const routes = require('./routes');

// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (environment === 'development') {
  // Only allow CORS in development
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

// Error handling middleware
app.use((err, req, res, next) => {
  // Handle CSRF token errors
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ message: 'Invalid CSRF token' });
  } else {
    // Handle other errors
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
