const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authInstance = require('../config/authInstance');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session handling.
app.get(
  '/api/sso',
  authInstance.authorize({ allowUnauthorized: true }),
  (req, res, next) => {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(200).json('UNAUTHORIZED');
    }
  }
);

app.get(
  '/api/sso/session',
  authInstance.authorize({ allowUnauthorized: true }),
  (req, res, next) => {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(200).json('UNAUTHORIZED');
    }
  }
);

// Login.
app.get('/api/sso/login', authInstance.initiate());

// Logout.
app.get('/api/sso/logout', authInstance.destroySession());

// Auth callback.
app.post('/api/sso/auth', authInstance.authenticate());

exports.handler = serverless(app);
