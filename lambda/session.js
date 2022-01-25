const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authInstance = require('./config/authInstance');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(
  '/api/session',
  authInstance.authorize({ allowUnauthorized: true }),
  (req, res, next) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json('UNAUTHORIZED');
    }
  }
);

exports.handler = serverless(app);
