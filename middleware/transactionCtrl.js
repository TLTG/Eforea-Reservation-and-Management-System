var db = require('../model/transaction');

var clients = [];
var id_count = 0;

exports.getCurrentSession = function(req, res, next){
    res.send(clients);
}

exports.recordSession = function(req, res, next){
    var customerID;
    var popClient = function(x, cb){
        var count = clients.length;
        var count1 = 0;
        clients.forEach(a=>{
            if(a.id == x){
                return cb(a, count1);
            }
            count--;
            count1++;
            if(count === 0){
                cb(null);
                return;
            }
        });
    }
    popClient(req.body.id, function(client, id){
        db.addCustomer([client.data.name, client.data.address, client.data.contact], function(err, customerID){
            if(err){
                res.send({error: 1, detail: "Internal Server Error."});
            }else{
                db.addTransaction([customerID, client.data.services, client.data.tID, req.body.total, client.data.stype], function(err, status){
                    if(err){
                        res.send({error: 1});
                        return next(new Error(err));
                    }else{
                        clients.splice(id, 1);
                        res.send({error: 0});
                        return;
                    }
                });
            }
        });
    });
}

exports.addSession = function(req, res, next){
    var _id = Date.today().getMonth()+1 + "" + Date.today().getDate() + "" + id_count; 
    var data = {id: id_count, data: req.body, display: _id};
    res.send({error: 0, data: id_count, display: _id});
    clients.push(data);
    id_count++;
}

exports.removeSession = function(req, res, next){
    var id = req.body.id;
    var count = 0;
    clients.forEach(x=>{
        if(x.id == id){
            clients.splice(count, 1);
            res.send({error: 0});
            return;
        }
        count++;
    });
}

exports.removeSched = function(req, res, next){
    db.removeSched(req.body.id, function(err, result){
        if(err) return res.send({error: 1});
        res.send({error: 0});
    });
}

exports.getClient = function(){
    return JSON.stringify(clients);
}

exports.setClient = function(data){
    clients = JSON.parse(data);
}

exports.getDashDetail = function(req, res, next){
    db.dashBoardDetail(null,function(data){
        res.send(data);
    });
}

exports.getPastTrans = function(req, res, next){
    db.getPastTransaction(null, function(err, results){
        if(err){ 
            res.send({error: 1});
            return next(new Error(err));
        }
        res.send({error: 0, data: results});
    });
}