var express = require('express'),
    router = express.Router();
var reserveGET = require('../middleware/reserveContent'),
    reservePOST = require('../middleware/reserve'),
    cart = require('../middleware/cart');

router.get('/', function (req, res) {
    res.render('main/index');
});
router.get('/services', function (req, res) {
    res.render('main/services');
});
router.get('/spa-party', function (req, res) {
    res.render('main/menu');
});
router.get('/schedule', function (req, res) {
    res.render('main/sched');
});
router.get('/about-us', function (req, res) {
    res.render('main/about');
});
router.get('/reserve', reserveGET, function(req, res){
    res.render('main/reservation', res.locals.param);
});
router.post('/reserve', reservePOST, function(req, res){});

router.get('/testReserve', function(req, res){
    res.render('main/test');
});

module.exports = router;