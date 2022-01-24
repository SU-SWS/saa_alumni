const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authInstance = require('./config/authInstance');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/api/auth-callback', authInstance.authenticate());

exports.handler = serverless(app);
