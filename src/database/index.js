const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Models
const User = require('../models/User');
const News = require('../models/News');
const SavedNews = require('../models/SavedNews');

const models = [User, News, SavedNews];

const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
