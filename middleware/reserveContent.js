var db = require('../model/service');

var guessUser = [];
var request;

exports.getUserBySID = function(param0){
    guessUser.forEach(element => {
        if(element.sid === param0){
            return element;
        }
    });
}

function func1() {
    return new Promise(function (fulfill, reject) {
        var categories = [];
        db.getCategory(function (err, result) {
            if (err) reject(err);
            else {
                var cat = result;
                cat.forEach(element => {
                    categories.push({ id: element.id, name: element.name });
                });
                fulfill(categories);
            }
        });
    });
}

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
}

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
                        category: element.category,
                        amount: element.amount
                    });
                });
                fulfill({ categories: data, services: service });
            }
        });
    });
}

function checkUser(param0) {
    return new Promise(function (fulfill, reject) {
        var currentUser = null;
        guessUser.forEach(elem => {
            if (elem.sid === request.sessionid) {
                currentUser = elem;
            }
            //console.log("[SERVER] returning guess");            
        });
        if (currentUser === null) {
            var newUser = {
                sid: request.sessionid,
                cart: []
            };
            guessUser.push(newUser);
            currentUser = newUser;
            //console.log("[SERVER] new guess");
        }
        fulfill({categories: param0.categories, services: param0.services, cart: currentUser.cart});
    });
}

var onErr = function (err) {
    console.error('[SERVER] ' + err);
}

module.exports = function (req, res, next) {
    request = req;
    func1()
        .then(func2, onErr)
        .then(func3, onErr)
        .then(checkUser, onErr)
        .then(function (data) {
            res.locals.param = data;
            next();
        }, onErr);
}