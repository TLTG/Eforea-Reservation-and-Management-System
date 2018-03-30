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
    var input = [req.body.id, req.body.name, req.body.desc, req.body.cat, req.body.price];
    db.updateService(input, function(err, data){
        if(err){
            next(new Error("Updating Data Error: " + err));
            res.send({error:1});
        }else{
            res.send({error:0});            
        }
    });
}