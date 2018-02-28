var db = require('../model/service'),
    reservation = require('./reserveContent');

module.exports = function (req, res, next) {
    var currUser = reservation.getUserByID(req.sessionid);
    var action = req.body.action;

    if (action === 'addToCart') {
        var itemID = req.body.id;
        var itemQ = req.body.num;

        currUser.cart.push({
            id: itemID,
            num: itemQ
        });

        next();
    }
    if (action === 'delToCart') {
        var itemID = req.body.id;
        var itemQ = req.body.num;
        var del, temp = 0;
        currUser.cart.forEach(element => {
            if(element.sid != itemID){
                temp++;
            }else{
                del = temp;
            }
        });
        currUser.cart.splice(del, 1);
    }
    if (action === 'reserve') {
        var name = req.body.name;
        var num = req.body.number;
        var loc = req.body.address;
        var serv = JSON.stringify(currUser.cart);
        var resv = req.body.date

        db.insertReservation([name, num, loc, serv, resv], function (err, result) {
            if (err) res.send("Error: " + err);
            else res.send("Success! " + result);
        });
        next();
    }
}