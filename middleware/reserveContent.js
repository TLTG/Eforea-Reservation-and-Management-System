var db = require('../model/service');

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

var onErr = function (err) {
    console.error('Error: ' + err);
}

module.exports = function (req, res, next) {
    var op1 = func1()
        .then(func2, onErr)
        .then(func3, onErr)
        .then(function (data) {
            res.locals.param = data;
            next();
        }, onErr);
}