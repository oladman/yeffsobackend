const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.MYSQLHOST, 
    user: process.env.MYSQLUSER, 
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
 
 
});

db.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = db.promise()



