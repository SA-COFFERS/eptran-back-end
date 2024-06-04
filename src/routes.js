const express = require('express');

// Middlewares
const loginRequired = require('./middlewares/loginRequired');

const routes = express.Router();

// User
routes.get('/', (req, res) => res.json({ msg: 'Hello World' }));

// CheckToken
routes.get('/checktoken', loginRequired, async (req, res) => {
  res.json({ msg: 'authorizaded' });
});

module.exports = routes;
