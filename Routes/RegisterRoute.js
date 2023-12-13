const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");

const urlDB= `mysql://root:GdCbAAHadgG-63fB14G1A1gH42AeCd6b@monorail.proxy.rlwy.net:14058/railway`
const db = mysql.createConnection(urlDB);

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