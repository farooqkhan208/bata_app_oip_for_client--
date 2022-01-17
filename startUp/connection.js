const mysql = require('mysql');
const config = require('config');

// for development
const connection = mysql.createConnection({
    host: config.get('sql.host'),
    user: config.get('sql.user'),
    password: config.get('sql.password'),
    database: config.get('sql.database')
});

module.exports = connection;