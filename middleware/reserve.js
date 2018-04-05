var db = require('../model/transaction');
var scheduler = require('./scheduler');

module.exports = function (req, res, next) {
    var userData = JSON.parse(req.body.data);
    var action = req.body.action;

    if (action === 'reserve') {
        var name = userData.name;
        var num = userData.number;
        var loc = userData.address;
        var serv = JSON.stringify(userData.cart);
        var resv = userData.data;

        scheduler.checkSched(resv, function(err, data){
            var out = {
                status: 0,
                details: ""
            }
            if(err) return next(err);
            if(data.available == false){
                out.status = 2;
                out.details = data;
                res.send(out);
            }else{
                db.insertReservation([name, num, loc, serv, resv], function (_err, result) {
                    if (_err) {
                        out.details = _err;
                        res.send(out);                
                        next(new Error("Sql Error: " + _err ));
                    }
                    else {
                        out.status = 1;
                        out.details = "Reserve On: " + resv + ". See you!";
                        res.send(out);
                        next();
                    }
                });
            }
        });
    }
}