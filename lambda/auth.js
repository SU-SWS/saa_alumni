const serverless = require('serverless-http');
const { auth } = require('adapt-auth-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/auth/login', auth.initiate());
app.get('/api/auth/logout', auth.destroySession());
app.get('/api/auth/session', auth.authorize(), async (req, res, next) => {
  res.json(req.user);
});
app.post('/api/auth/callback', auth.authenticate());

exports.handler = serverless(app);
