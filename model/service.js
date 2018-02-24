var db = require('./db');

exports.getAllServices = function(done){
    var sql = "CALL viewService()";
    db.get().query(sql, function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}

exports.getCategory = function(done){
    var sql = "CALL viewCategory()";
    db.get().query(sql, function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}

exports.countService = function(id, done){
    var sql = "CALL getCategoryServiceCount(?)";
    db.get().query(sql, [id], function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}

exports.insertReservation = function(data, done){
    var sql = "CALL addReservation(?,?,?,?,1,?)";
    db.get().query(sql, data, function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}