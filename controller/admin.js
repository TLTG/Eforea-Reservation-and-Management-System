var express = require('express'),
    router = express.Router(),
    auth = require('../model/user.js');

router.get('/', function (req, res){
    res.render('admin/login');
});

router.get('/testAdmin', function (req, res){
    res.render('admin/dashboard');
});

router.post('/', function (req, res){
    var cred = {
        user: req.body.username,
        pass: req.body.password
    }
    auth.login(cred.user, cred.pass, function (err, result){
        if(err) {
            res.send('Internal Server Error');
            console.log(err);
        }else{
            var user_data = {
                id: result.id,
                usertype: result.usertype
            }
            if(user_data.usertype==1){
                res.render('admin/dashboard');
            }
        }
    });
});

module.exports = router;