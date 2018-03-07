var db = require('../model/service');

var guessUser = [];
var request;

exports.getUserBySID = function(param0){
    //console.log(JSON.stringify(guessUser));
    guessUser.forEach(element => {
        if(element.sid === param0){
            return element;
        }
    });
}

//niremove ko na to kasi nasa client na yung cart nila. rereuse ko nalang sa admin side.
/*function checkUser(param0) { 
    return new Promise(function (fulfill, reject) {
        var currentUser = null;
        guessUser.forEach(elem => {
            if (elem.sid === param0.sessionid) {
                currentUser = elem;
            }
            //console.log("[SERVER] returning guess");            
        });
        if (currentUser === null) {
            var newUser = {
                sid: param0.sessionid,
                cart: []
            };
            guessUser.push(newUser);
            currentUser = newUser;
            //console.log("[SERVER] new guess");
        }
        fulfill({categories: param0.categories, services: param0.services, cart: currentUser.cart});
    });
}*/

function func1() {
    return new Promise(function (fulfill, reject) {
        var categories = [];
        db.getCategory(function (err, result) {
            if (err) reject(err);
            else {
                var cat = result;
                cat.forEach(element => {
                    categories.push({ 
                        id: element.id, 
                        name: element.name, 
                        count: element.count, 
                    });
                });
                fulfill(categories);
            }
        });
    });
}
/*  This is disbled due to uncertain conditions na nagpapalala ng anxiety ko.
var func2 = function (data) {
    return new Promise(function (fulfill, reject) {
        var categories = [];
        data.forEach(element => {
            db.countService(element.id, function (err, result) {
                if (err) reject(err);
                else {
                    categories.push({
                        name: element.name,
                        count: result[0].count
                    });
                }
            });
        });
        fulfill(categories);
    });
}*/

var func3 = function (data) {
    return new Promise(function (fulfill, reject) {
        var service = [];
        db.getAllServices(function (err, result) {
            if (err) reject(err);
            else {
                result.forEach(element => {
                    service.push({
                        id: element.id,
                        name: element.name,
                        desc: element.description,
                        time: element.time,
                        type: element.serviceType,
                        category: element.category,
                        amount: element.amount
                    });
                });
                fulfill({ categories: data, services: service });
            }
        });
    });
}

var onErr = function (err) {
    console.error('[SERVER] ' + err);
}

exports.reserveContent = function (req, res, next) {
    request = req;
    func1()
        //.then(func2, onErr)
        .then(func3, onErr)
        .then(function (data) {
            //console.log(JSON.stringify(data));
            res.send(data);
        }, onErr);
}