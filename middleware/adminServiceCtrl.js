var db = require('../model/service');

//This is called when client request for deletion of service
exports.delService = function(req, res, next){
    db.deleteService(req.body.id, function(err, data){
        if(err){
            next(new Error("Deleting Service Data Error: " + err));
            res.send({error:1});
            
        }else{
            res.send({error:0});
        }
    });
}

//This is called when client send update to service data.
exports.updateService = function(req, res, next){
    var input = [req.body.id, req.body.name, req.body.desc, req.body.cat, req.body.price, req.body.st];
    db.updateService([input, req.body.old], function(err, data){
        if(err){
            next(new Error("Updating Data Error: " + err));
            res.send({error:1});
        }else{
            if(data == 1){
                res.send({error:2, detail: "Name Already Exist!"});
            }else{
                res.send({error:0});            
            }
        }
    });
}

//This is called when client add new service data.
exports.addService = function(req, res, next){
    var input = [req.body.name, req.body.desc, req.body.time, req.body.price, req.body.st, req.body.cat];
    db.addService(input, function(err, data){
        if(err){
            next(new Error("Inserting Data Error: " + err));
            res.send({error:1});
        }else{
            if(data == 1){
                res.send({error:2, detail: "Name Already Exist!"});
            }else{
                res.send({error:0});            
            }
        }
    });
}

exports.addCategory = function(req, res, next){
    db.addCategory([req.body.name], function(err, data){
        if(err){
            next(new Error("Inserting Data Error: " + err));
            res.send({error:1});
        }else{
            if(data == 0){
                res.send({error:0});            
            }else{
                res.send({error:2, detail: "Same Category Already Exist."});
            }
        }
    });
}

exports.delCategory = function(req, res, next){
    db.deleteCategory([req.body.id], function(err, data){
        if(err){
            next(new Error("Deleting Category Data Error: " + err));
            res.send({error:1});
        }else{
            res.send({error:0});
        }
    });
}

exports.getAllCategories = function(req, res, next){
    db.getAllCategory(null, function(err, _data){
        if(err){
            next(new Error(err));
            res.send({error: 1, detail: err});
        }else{
            res.send({error: 0, data: _data});
        }
    });
}