var express = require('express');
var router = express.Router();
var parser = require('body-parser');

router.use(parser.urlencoded({ extended: false }));
router.use(parser.json());

router.use('/', require('./mainPage'));
router.use('/admin', require('./admin'));

//export this router to use in our server.js
module.exports = router;