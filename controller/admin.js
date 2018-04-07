var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth'),
    maintenance = require('../middleware/adminServiceCtrl'),
    staff = require('../middleware/adminStaffCtrl'),
    transac = require('../middleware/transactionCtrl');

router.get('/', auth.checkUsers);
router.post('/', auth.login);
router.get('/logout', auth.logout);

router.post('/addService', maintenance.addService);
router.post('/delService', maintenance.delService);
router.post('/updateService', maintenance.updateService);

router.post('/addCategory', maintenance.addCategory);
router.post('/delCategory', maintenance.delCategory);
router.get('/categories', maintenance.getAllCategories);

router.post('/addEmployee', staff.addEmployee);
router.post('/delEmployee', staff.delEmployee);
router.post('/editEmployee', staff.editEmployee);
router.post('/employeeTrans', staff.viewTrnsEmployee);
router.get('/employees', staff.viewEmployee);

router.get('/customerSessionList', transac.getCurrentSession);
router.post('/addSession', transac.addSession);
router.post('/delSession', transac.removeSession);
router.post('/recSession', transac.recordSession);

router.post('/delSched', transac.removeSched);

router.get('/dashInfo', transac.getDashDetail);

module.exports = router;