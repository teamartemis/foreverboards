var express = require('express');
var cors = require('cors');
var upload = require('./upload');
var app = express();

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
} else {
  app.use(express.static('client'));
}

app.use('/upload', upload);

module.exports = app;
