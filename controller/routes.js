// route.js : This contains the routing of the server.
//Imports
var express = require('express');
var router = express.Router();

router.use('/', require('./mainPage'));
router.use('/admin', require('./admin'));
/*router.get('*', function(req, res){
    res.send("404 Error: Page not Found!");
});*/

//export this router to use in our server.js
module.exports = router;