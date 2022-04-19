const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authInstance } = require('./authInstance');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/auth/login', authInstance.initiate());
app.get('/api/auth/logout', authInstance.destroySession());
app.get(
  '/api/auth/session',
  authInstance.authorize({ allowUnauthorized: true }),
  (req, res, next) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json('UNAUTHORIZED');
    }
  }
);
app.post('/api/auth/callback', authInstance.authenticate(), (req, res) => {
  const redirectUrl = req.samlRelayState.finalDestination || '/';
  res.redirect(redirectUrl);
});

exports.handler = serverless(app);
