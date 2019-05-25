const mysql = require('mysql');

var connection = {};

connection =  
    mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : null,
        database : 'bdestudiantes'
    })
;

module.exports = connection;