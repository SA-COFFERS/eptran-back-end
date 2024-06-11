const express = require('express');

// Controllers
const userController = require('./controllers/userController');
const newsController = require('./controllers/newsController');
const savedNewsController = require('./controllers/savedNewsController');

// Middlewares
const loginRequired = require('./middlewares/loginRequired');
const isStaff = require('./middlewares/isStaff');
const isAdmin = require('./middlewares/isAdmin');
const upload = require('./config/multer');

const routes = express.Router();

// User
routes.get('/users/index', isAdmin, userController.index);
routes.get('/users/id/:id', isAdmin, userController.show);
routes.post('/users/register', userController.create);
routes.post('/users/login', userController.login);
routes.put('/users/update', loginRequired, userController.update);
routes.delete('/users/delete', loginRequired, userController.delete);
routes.put('/users/upload', loginRequired, upload.single('file'), userController.upload);
routes.put('/users/removeimage', loginRequired, userController.removeimage);

// News
routes.post('/news/add', isStaff, upload.single('file'), newsController.create);
routes.get('/news/index', newsController.index);
routes.get('/news/id/:id', newsController.show);
routes.get('/news/userid/:id', newsController.getByUserId);
routes.put('/news/update/:id', isStaff, upload.single('file'), newsController.update);
routes.delete('/news/delete/:id', isStaff, newsController.delete);

// SavedNews
routes.post('/savednews/save', loginRequired, savedNewsController.save);
routes.get('/savednews/index', loginRequired, savedNewsController.index);
routes.delete('/savednews/delete', loginRequired, savedNewsController.delete);

// CheckToken
routes.get('/checktoken', loginRequired, async (req, res) => {
  res.json({ msg: 'authorizaded' });
});

routes.get('/', async (req, res) => {
  res.json({ msg: 'hello' });
});

module.exports = routes;
