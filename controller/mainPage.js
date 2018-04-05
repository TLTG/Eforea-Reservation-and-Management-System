var express = require('express'),
    router = express.Router();
var reserveGET = require('../middleware/reserveContent'),
    reservePOST = require('../middleware/reserve');

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
router.get('/reserve', function(req, res){
    res.render('main/reservation');
});
router.get('/reserve/data', reserveGET.reserveContent);

router.post('/reserve', reservePOST);

router.get('/reserve/list', reserveGET.getReservations);

module.exports = router;