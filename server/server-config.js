var express = require('express');

var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
} else {
  app.use(express.static('client'));
}

module.exports = app;
