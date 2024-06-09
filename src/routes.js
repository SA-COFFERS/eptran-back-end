const express = require('express');

// Controllers
const userController = require('./controllers/userController');
const newsController = require('./controllers/newsController');

// Middlewares
const loginRequired = require('./middlewares/loginRequired');
const isStaff = require('./middlewares/isStaff');
const upload = require('./config/multer');

const routes = express.Router();

// User
routes.get('/users/index', userController.index);
routes.get('/users/id/:id', userController.show);
routes.post('/users/register', userController.create);
routes.post('/users/login', userController.login);
routes.put('/users/update', loginRequired, userController.update);
routes.delete('/users/delete', loginRequired, userController.delete);
routes.put('/users/upload', loginRequired, upload.single('file'), userController.upload);
routes.put('/users/removeimage', loginRequired, userController.removeimage);

// News
routes.post('/news/add', isStaff, upload.single('file'), newsController.create);

// CheckToken
routes.get('/checktoken', loginRequired, async (req, res) => {
  res.json({ msg: 'authorizaded' });
});

routes.get('/', async (req, res) => {
  res.json({ msg: 'hello' });
});

module.exports = routes;
