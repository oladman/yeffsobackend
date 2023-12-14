const mysql = require("mysql");

const pool = mysql.createPool({
    host: process.env.MYSQLHOST, 
    user: process.env.MYSQLUSER, 
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
 
});

module.exports = db.promise()