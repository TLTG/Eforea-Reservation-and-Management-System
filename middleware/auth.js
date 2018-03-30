var db = require('../model/user');

var users = [];

exports.checkUsers = function (req, res){
    if(req.session.user){
        var user = req.session.user;
        if(user.id != -1){
            users.forEach(element => {
                if(element.id === user.id){
                    res.render('admin/dashboard', [element]);
                }
            });
        }else{
            res.render('admin/login');
        }
    }else{
        res.render('admin/login');
    }
}

exports.login = function (req, res, next){
    var cred = {
        user: req.body.username,
        pass: req.body.password
    }
    db.login(cred.user, cred.pass, function (err, result){
        if(err) {
            next(new Error("login authentication error: must be db related issue"));
        }else{
            if(result !== undefined){
                var user_data = {
                    id: result.id,
                    usertype: result.usertype
                }
                var flag = true;
                users.forEach(element => {
                    if(element.id === user_data.id){
                        flag = false;
                    }
                });
                if(flag){
                    if(user_data.usertype==1){
                        console.log("[SERVER] Admin User Login. UserID: " + user_data.id);
                        users.push(user_data);
                        req.session.user = user_data;
                        res.send([2,JSON.stringify(user_data)]);
                    }
                }else{
                    res.send([1,"Already login"]);
                }
            }else{
                res.send([0, "invalid user/password"]);
            }
        }
    });
}

exports.logout = function (req, res){
    var a = 0;
    users.forEach(element => {
        if(element.id === req.session.user.id){
            console.log("[SERVER] UserID: "+ element.id +" Logout.");
            users.splice(a, 1);
            req.session.user.id = -1;
            res.redirect('/admin');
        }else{
            a++;
        }
    });
}