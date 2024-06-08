const express = require('express');
require('dotenv').config();

require('./database');

const app = express();
const cors = require('cors');
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('uploads', express.static('../uploads'));
app.use(routes);

app.listen(process.env.PORT, process.env.HOST);
