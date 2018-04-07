var transac = require('../middleware/transactionCtrl');
var fs = require('fs');

exports.readPrompt = function () {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (cmd) {
        if (cmd.trim() === 'shutdown') {
            console.log('[SERVER] shutting down server...');
            //Other process to execute before shutting down.
            saveSessions().then(function () {
                process.exit(0);
            });
        } else if (cmd.trim() === 'clients') {
            console.log("[SERVER] "+ transac.getClient());
        } else if (cmd.trim() === 'time') {
            console.log("[SERVER] "+ Date.today().toString('yyyy-MM-dd'));
        } else if (cmd.trim() === 'loadSession') {
            loadSessions();
        }
    });
}

var loadSessions = function () {
    var buf = new Buffer(1024);
    console.log('[SERVER] Loading Sessions...');
    fs.open('sessions.json', 'r', function (err, fd) {
        if (err) return console.error(err);
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            if (bytes > 0) {
                transac.setClient(buf.slice(0, bytes).toString());
            }
            console.log('[SERVER] Done Loading');            
        });
    });
}

var saveSessions = function () {
    return new Promise(function (done, fail) {
        console.log('[SERVER] Saving Client\'s Transaction Sessions');
        var data = transac.getClient();
        fs.writeFile('sessions.json', data, function (err) {
            if (err) {
                console.error(err);
                fail(err);
            } else {
                console.log('[SERVER] Save Done.');
                done();
            }
        });
    });
}