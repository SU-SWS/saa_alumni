const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authInstance = require('../config/authInstance');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/api/sso/logout', authInstance.destroySession());

exports.handler = serverless(app);
