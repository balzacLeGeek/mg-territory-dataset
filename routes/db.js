var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b64a6918b92cd1',
    password : '3adb58b3',
    database : 'heroku_4aa6e1b95f5c2bf'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;