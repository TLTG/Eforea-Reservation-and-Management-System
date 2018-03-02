var db = require('../model/service');
    //reservation = require('./reserveContent');

module.exports = function (req, res, next) {
    //var currUser = reservation.getUserBySID(req.sessionid);
    var userData = JSON.parse(req.body.data);
    var action = req.body.action;
    console.log(action);
    if (action === 'reserve') {
        //console.log('reserving');
        var name = userData.name;
        var num = userData.number;
        var loc = userData.address;
        var serv = JSON.stringify(userData.cart);
        var resv = userData.data;

        db.insertReservation([name, num, loc, serv, resv], function (err, result) {
            if (err) {
                var _err = new Error("Sql Error: " + err );
                //console.error(err);
                next(_err);
            }
            else {
                //console.log("Success " + result);
                next();
            }
        });
    }
}