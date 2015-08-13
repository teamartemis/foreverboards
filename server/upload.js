var express = require('express');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    var ext = file.originalname.match(/^(.*)(\.[^.]*)$/)[2];
    var name = 'ffffffffffffffffffffffffffffffff'.split('').map(function() {
      return Math.floor(Math.random() * 0xf).toString(16);
    }).join('');
    cb(null, name + ext);
  }
});

var upload = multer({ storage: storage });
var router = express.Router();

router.post('/', upload.single('file'), function(req, res) {
  if (req.file) {
    res.status(201).json({url: '/upload/' + req.file.filename});
  } else {
    res.status(404).end();
  }
});

router.use(express.static('uploads'));

module.exports = router;
