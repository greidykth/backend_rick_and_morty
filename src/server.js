require("dotenv").config(); // process.env
const express = require('express');
const server = express();
const morgan = require('morgan');
const mainRouter = require('./routes/index');

server.use(express.json());//para usar el body de las req en formato de obj de js


server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
     'Access-Control-Allow-Methods',
     'GET, POST, OPTIONS, PUT, DELETE'
  );
  next();
});

server.use(morgan("dev"));
server.use(mainRouter)

module.exports = server;