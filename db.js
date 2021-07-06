require('dotenv').config();

const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
});


const mongoConnect = () => {
  mongoose.connect(
    'mongodb://localhost:27017/dev',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
    }
  );
};

module.exports = { sequelize, mongoConnect };
