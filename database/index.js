const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.MYSQLHOST, 
    user: process.env.MYSQLUSER, 
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
 
 
});



module.exports = db;



