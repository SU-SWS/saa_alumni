const serverless = require('serverless-http');
const { AdaptAuth } = require('adapt-auth-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const getSiteUrl = require('../src/utilities/getSiteUrl');

// Automatically set origin, if not passed explicitly.
const siteUrl = getSiteUrl();
const authInstance = new AdaptAuth({
  saml: {
    returnToOrigin: process.env.ADAPT_AUTH_SAML_RETURN_ORIGIN || siteUrl,
  },
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/auth/login', authInstance.initiate());
app.get('/api/auth/logout', authInstance.destroySession());
app.get(
  '/api/auth/session',
  authInstance.authorize(),
  async (req, res, next) => {
    res.json(req.user);
  }
);
app.post('/api/auth/callback', authInstance.authenticate());

exports.handler = serverless(app);
