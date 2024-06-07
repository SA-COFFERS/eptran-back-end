const express = require('express');

// Controllers
const userController = require('./controller/userController');

// Middlewares
const loginRequired = require('./middlewares/loginRequired');

const routes = express.Router();

// User
routes.post('/user/register', userController.create);
routes.post('/user/login', userController.login);

// CheckToken
routes.get('/checktoken', loginRequired, async (req, res) => {
  res.json({ msg: 'authorizaded' });
});

module.exports = routes;
