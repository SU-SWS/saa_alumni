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
    cert: process.env.ADAPT_AUTH_SAML_CERT,
    decryptionKey: process.env.ADAPT_AUTH_SAML_DECRYPTION_KEY,
    returnToOrigin: siteUrl,
    returnToPath: process.env.ADAPT_AUTH_SAML_RETURN_PATH,
  },
  session: {
    secret: process.env.ADAPT_AUTH_SESSION_SECRET,
    loginRedirectUrl: process.env.ADAPT_AUTH_SESSION_LOGIN_URL || '/',
  },
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/auth/login', authInstance.initiate());
app.get('/auth/logout', authInstance.destroySession());
app.get('/auth/session', authInstance.authorize(), (req, res, next) => {
  res.json(req.user);
});
app.post('/auth/callback', authInstance.authenticate());

exports.handler = serverless(app);
