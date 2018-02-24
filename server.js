//Imports
var express = require('express');
var db = require('./model/db');
var app = express();

//Configurations
app.set('view engine', 'ejs'); //this change the view engine to ejs, (mahirap kasi yung default)
app.use(require('express-promise')()); //this makes promises come true. Still can't use it properly soo disable muna. 
app.use('/', require('./controller/routes')); //this will route everything.
app.use('/assets', express.static(__dirname + '/public')); //this make public folder static/public

//Initialize DB connection and Server Port Listener
db.connect(db.MODE_PRODUCTION, function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        //Change yung port pag production na.
        app.listen(80, function () {
            console.log('Listening on port 80...');
        });
    }
});