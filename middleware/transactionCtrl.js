var db = require('../model/transaction');

var clients = [];

exports.getCurrentSession = function(req, res, next){
    res.send(clients);
}

exports.recordSession = function(req, res, next){
    var id = req.body.id;
    var customerID;
    var errCount = 0;
    db.addCustomer([clients[id].data.name, clients[id].data.address, clients[id].data.contact], function(err, customerID){
        if(err){
            res.send({error: 1, detail: "Internal Server Error."});
        }else{
            db.addTransaction([customerID, clients[id].data.sID, clients[id].data.tID, req.body.total, 0], function(err, status){
                if(err){
                    next(new Error(err));
                    return res.send({error: 1});
                }else{
                    clients.splice(id, 1);
                    res.send({error: 0});
                    return;
                }
            });
        }
    });
}

exports.addSession = function(req, res, next){
    var data = {id: clients.length, data: req.body};
    res.send({error: 0, data: clients.length});
    clients.push(data);
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