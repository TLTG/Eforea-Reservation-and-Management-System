var db = require('./db');

exports.login = function(user, pass, done){
    db.get().query('CALL `sysLogin`(?, ?);', [user,pass], function (err, rows){
        if(err) return done(err);
        done(null, rows[0][0]);
    });
}

exports.registerUser = function(user, pass, usertype, done){
    db.get().query('CALL `addSysAccount`(?, ?, ?)', [user, pass, usertype], function (err, rows){
        if(err) return done(err);
        done(null, rows);
    });
}

exports.updateUser = function(userID, user, pass, usertype, done){

}