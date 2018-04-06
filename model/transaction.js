var db = require('./db');

exports.insertReservation = function(data, done){
    var sql = "CALL addReservation(?,?,?,?,?)";
    db.get().query(sql, data, function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    });
}

exports.getSchedOnDay = function(date, done){
    var sql = "CALL getSameSched(?)"; //Construct this first.
    /* db.get().query(sql, [date], function(err, results){
        if(err) return done(err);
        done(null, results[0]);
    }); */
    done(null, []);
}

exports.addCustomer = function(data, done){
    var sql = "SELECT id FROM customer WHERE LOWER(name) =  LOWER('"+ data[0] +"')";
    db.get().query(sql, function(err, result){
        if(result.length == 1){ 
            done(null, result[0].id);    
        }else{
            sql = "CALL addCustomer(?,?,?)";
            db.get().query(sql, data, function(errr, resultt){
                if(errr){
                    done(err);
                }else{ 
                    done(null, resultt.insertId);
                }
            });
        }
    });
}

exports.addTransaction = function(data, done){
    var sql = "CALL addTrans(?,?,?,?,?)";
    db.get().query(sql, data, function(err, result){
        if(err) return done(err);
        done(null, result[0]);
    });
}

exports.getReservation = function(data, done){
    var sql = "SELECT * FROM web_reservation WHERE status = 0";
    db.get().query(sql, function(err, results){
        if(err) return done(err);
        done(null, results);
    });
}

exports.removeSched = function(data, done){
    var sql = "UPDATE web_reservation SET status = 1 WHERE id = '"+ data +"'";
    db.get().query(sql, function(err, result){
        if(err) return done(err);
        done(null, true);
    });
}

exports.dashBoardDetail = function(){
    var sql1 = "SELECT COUNT(*) as 'transactions' FROM transaction date LIKE('%"+ Date.today().toString('yyyy-MM-dd') +"%')";
    var sql2 = "SELECT COUNT(*) as 'reservations' FROM web_reservation";
    var sql3 = "SELECT SUM(total_amount) as 'today_sale' FROM transaction WHERE date LIKE('%"+ Date.today().toString('yyyy-MM-dd') +"%')";
    var sql2 = "SELECT SUM(total_amount) as 'week_sale' FROM transaction WHERE date BETWEEN '"+ Date.parse('last monday').toString('yyyy-MM-dd 00:00:00') +"' AND '"+ Date.today().toString('yyyy-MM-dd 23:59:59') +"'";  
    
}