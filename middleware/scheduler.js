var db = require('../model/transaction');

exports.checkSched = function(date, callback){
    var details = {
        available: false,
        info: ""
    };
    //This split the data, sample: 12/08/1998 11:38 this return ['12/08/1998','11:38']
    var exact = date.split(' ');
    db.getSchedOnDay(exact[0], function(err, data){
        if(err == null){
            if(data.length > 0){
                // TANGNA DI KO NA ALAM GAGAWIN DITO.
                details.available = true;
                callback(null, details);
            }else{
                details.available = true;
                details.info = "";
                callback(null, details);
            }
        }else{
            callback(err);
        }
    });    
}