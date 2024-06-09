/* eslint-disable import/order */
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger.json');

require('dotenv').config();

require('./database');

const app = express();
const cors = require('cors');
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/uploads', express.static('uploads'));
app.use(routes);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  console.log('PhpMyAdmin running on http://localhost:8080');
});
