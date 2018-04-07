var db = require('./db');

exports.addEmployee = function (data, cb) {
    var sql = "CALL addEmployee(?,?,?,?)";
    db.get().query(sql, data, function (err, results) {
        if (err) return cb(err);
        cb(null, results[0]);
    });
}

exports.editEmployee = function (data, cb) {
    var sql = "CALL editEmployee(?,?,?,?,?)";
    db.get().query(sql, data, function (err, results) {
        if (err) return cb(err);
        cb(null, results[0]);
    });
}

exports.delEmployee = function (data, cb) {
    var sql = "CALL delEmployee(?)";
    db.get().query(sql, data, function (err, result) {
        if (err) return cb(err);
        cb(null, result[0]);
    });
}

exports.getAllEmployee = function (data, cb) {
    var sql = "CALL viewEmployee()";
    db.get().query(sql, function (err, results) {
        if (err) return cb(err);
        cb(null, results[0]);
    });
}

exports.getTransEmp = function (data, cb) {
    var sql = "CALL viewTransCountPerEmp(?)";
    db.get().query(sql, data, function (err, result) {
        if (err) return cb(err);
        cb(null, result[0]);
    });
}

// BASIC Format ko ng querying
//exports.addEmployee = function(data, cb){
//    var sql = "";
//    db.get().query(sql, data, function(err, results){
//        if(err) return cb(err);
//        cb(null, results[0]);
//    });
//}