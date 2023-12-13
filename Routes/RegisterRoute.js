const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");

const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  });

  const salt = 10;

router.post("/", (req, res) => {
    const sql =
      "INSERT INTO users (`FirstName`, `LastName`, `Email`, `PhoneNumber`, `Password`, `Role`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error harshing password" });
      const RegValue = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.phonenumber,
        hash,
        req.body.role
        
      ];
      db.query(sql, [RegValue], (err, result) => {
        if (err) return res.json({ Error: "Error inserting into server" });
        return res.json({ Status: "Success" });
      });
    });
  });
  


  module.exports = router;