var express = require('express');
var upload = require('./upload');
var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
} else {
  app.use(express.static('client'));
}

app.use('/upload', upload);

module.exports = app;
