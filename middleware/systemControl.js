exports.readPrompt = function (){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(cmd){
        if(cmd.trim() === 'shutdown'){
            console.log('[SERVER] shutting down server...');
            //Other process to execute before shutting down.
            process.exit(0);
        }
    });
}