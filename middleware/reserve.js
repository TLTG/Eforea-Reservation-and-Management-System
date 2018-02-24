var db = require('../model/service');

module.exports = function(req, res, next){
    var name = req.body.name;
    var num = req.body.number;
    var loc = req.body.address;
    var serv = req.body.services;
    var resv = req.body.date

    db.insertReservation([name, num, loc, serv, resv],function(err, result){
        if(err) res.send("Error: " + err);
        else res.send("Success! " + result);
    });
}