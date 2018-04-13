var db = require('./db');

exports.insertReservation = function(data, done){
    var sql = "CALL addReservation(?,?,?,?,?,?)";
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

exports.dashBoardDetail = function(_data, done){
    var sql1 = "SELECT COUNT(*) as 'transactions' FROM transaction WHERE date LIKE '%"+ Date.today().toString('yyyy-MM-dd') +"%' ";
    var sql2 = "SELECT COUNT(*) as 'reservations' FROM web_reservation";
    var sql3 = "SELECT SUM(total_amount) as 'today_sale' FROM transaction WHERE date LIKE '%"+ Date.today().toString('yyyy-MM-dd') +"%' ";
    var sql4 = "SELECT SUM(total_amount) as 'week_sale' FROM transaction WHERE date BETWEEN '"+ Date.parse('last monday').toString('yyyy-MM-dd 00:00:00') +"' AND '"+ Date.today().toString('yyyy-MM-dd 23:59:59') +"'";  
    var sql5 = "SELECT e.name, COUNT(t.id) as count FROM transaction t, employee e WHERE t.attendantID = e.id GROUP BY e.name ORDER BY count DESC LIMIT 3";
    var sql6 = "SELECT serviceID FROM transaction";
    
    var data = {}

    var query1 = function(){
        return new Promise(function(done, reject){
            db.get().query(sql1, function(err, result){
                if(err){
                    reject(err)
                }else {
                    data['transaction'] = result[0].transactions;
                    done();
                }
            });
        });
    }
    var query2 = function(){
        return new Promise(function(done, reject){
            db.get().query(sql2, function(err, result){
                if(err){
                    reject(err)
                }else {
                    data['reservation'] = result[0].reservations;
                    done();
                }
            });
        });
    }
    var query3 = function(){
        return new Promise(function(done, reject){
            db.get().query(sql3, function(err, result){
                if(err){
                    reject(err)
                }else {
                    data['tsale'] = result[0].today_sale;
                    done();
                }
            });
        });
    }
    var query4 = function(){
        return new Promise(function(done, reject){
            db.get().query(sql4, function(err, result){
                if(err){
                    reject(err)
                }else {
                    data['wsale'] = result[0].week_sale;
                    done();
                }
            });
        });
    }
    var query5 = function(){
        return new Promise(function(done, reject){
            db.get().query(sql5, function(err, result){
                if(err){
                    reject(err)
                }else {
                    var arr = [];
                    result.forEach(element => {
                        arr.push({
                            name: element.name,
                            count: element.count
                        });
                    });
                    data['topEmployee'] = arr;
                    done();
                }
            });
        });
    }
    var query6 = function(){
        return new Promise(function(done, reject){
            db.get().query(sql6, function(err, result){
                if(err){
                    reject(err)
                }else {
                    var out = "";
                    result.forEach(x=>{
                        out += x.serviceID + "/";
                    });
                    data['services'] = out;
                    done();
                }
            });
        });
    }

    query1().then(query2).then(query3).then(query4).then(query5).then(query6).then(function(){
        done(data);
    });
}

exports.getPastTransaction = function(data, done){
    var sql = "SELECT t.id, c.name as customer, e.name as therapist, t.serviceID, t.date, t.serviceType FROM transaction t, customer c, employee e WHERE c.id = t.customerID AND e.id = t.attendantID ORDER BY date ASC";
    db.get().query(sql, function(err, results){
        if(err) return done(err);
        done(null, results);
    });
}