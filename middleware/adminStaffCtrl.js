var db = require('../model/staff');

exports.addEmployee = function(req, res, next){
    var data = [req.body.name, req.body.contact, req.body.address, req.body.gender];
    db.addEmployee(data, function(err, result){
        if(err){
            res.send({error: 1});
        }else{
            res.send({error: 0});
        }
    });
}

exports.editEmployee = function(req, res, next){
    var data = [req.body.id, req.body.name, req.body.contact, req.body.address, req.body.gender];   
    db.editEmployee(data, function(err, result){
        if(err){
            next(new Error(err));
            res.send({error: 1});
        }else{
            res.send({error: 0});
        }
    });
}

exports.delEmployee = function(req, res, next){
    db.delEmployee([req.body.id], function(err, result){
        if(err){
            res.send({error: 1});
        }else{
            res.send({error: 0});
        }
    });
}

exports.viewEmployee = function(req, res, next){
    db.getAllEmployee(null, function(err, results){
        if(err){
            res.send({error: 1});
        }else{
            res.send({error: 0, data: results});
        }
    });
}

exports.viewTrnsEmployee = function(req, res, next){
    db.getTransEmp([req.body.id], function(err, result){
        if(err){
            res.send({error: 1});
        }else{
            res.send({error: 0, data: result});
        }
    });
}