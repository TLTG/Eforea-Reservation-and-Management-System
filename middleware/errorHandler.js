module.exports = function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send("Internal Server Error, Sorry for inconvience we'll fix it soon.");
}