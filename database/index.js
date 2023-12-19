const mysql = require('mysql2')
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.MYSQLHOST, 
    user: process.env.MYSQLUSER, 
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = db