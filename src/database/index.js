const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Models
const User = require('../models/User');
const UserImage = require('../models/UserImage');

const models = [User, UserImage];

const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
