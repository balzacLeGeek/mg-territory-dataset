var mysql = require('mysql');

var db_config = {
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b64a6918b92cd1',
    password : '3adb58b3',
    database : 'heroku_4aa6e1b95f5c2bf'
};
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

    connection.connect(function(err) {            // The server is either down
        if(err) {                                 // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                   // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                       // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                // server variable configures this)
        }
    });
}

handleDisconnect();

module.exports = connection;