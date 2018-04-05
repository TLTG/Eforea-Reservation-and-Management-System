var db = require('./db');

exports.getAllServices = function(done){
    var sql = "CALL viewService()";
    db.get().query(sql, function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}

exports.getCategory = function(done){
    var sql = "CALL viewCategoryCount()";
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

exports.deleteService = function(id, done) {
    var sql = "CALL delService(?)";
    db.get().query(sql, [id], function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}

exports.updateService = function(data, done){
    var sql = "SELECT name FROM service WHERE LOWER(name) = LOWER('" + data[0][1] + "') AND name != '"+ data[1] +"'";
    db.get().query(sql, function(err1, result){
        if(result.length == 1){            
            return done(null, 1);
        }else{
            var sql = "CALL editService(?,?,?,?,?,?)";
            db.get().query(sql, data[0], function(err, results){
                if(err) return done(err);
                done(null, results[0]);
            });
        }
    });
}

exports.addService = function(data, done){
    var sql = "SELECT name FROM service WHERE LOWER(name) = LOWER('" + data[0] + "')";
    db.get().query(sql, function(err1, result){
        if(result.length != 0){            
            return done(null, 1);
        }else{
            var sql = "CALL addService(?,?,?,?,?,?)";
            db.get().query(sql, data, function(err, results){
                if(err) return done(err);
                done(null, results[0]);
            });
        }
    });
}

exports.addCategory = function(data, done){
    var sql = "SELECT * FROM `service_cat` WHERE LOWER(name) = LOWER('" + data[0] + "')";
    db.get().query(sql, function(err, result){
        if(result.length != 0){
            return done(null,1);
        }else{
            var sql = "CALL addCategory(?)";
            db.get().query(sql, data, function(err, results){
                if(err) return done(err);
                done(null, 0);
            });
        }
    });
}

exports.deleteCategory = function(data, done){
    var sql = "CALL delCategory(?)";
    db.get().query(sql, data, function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}

exports.getAllCategory = function(data, done){
    var sql = "SELECT * FROM service_cat WHERE purgeFlag = 0";
    db.get().query(sql, function(err, data){
        if(err) return done(err);
        done(null, data);
    });
}
