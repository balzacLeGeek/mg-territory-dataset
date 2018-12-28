var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'ftp.b-project.mg',
    user     : 'bproject_balzacLeGeek',
    password : '2ypAR/#$39x',
    database : 'bproject_mglocalisation'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;