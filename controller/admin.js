var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth'),
    maintenance = require('../middleware/adminServiceCtrl');

router.get('/', auth.checkUsers);

router.post('/', auth.login);

router.get('/logout', auth.logout);

router.post('/delService', maintenance.delService);

router.post('/updateService', maintenance.updateService);

module.exports = router;