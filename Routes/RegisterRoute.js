const db = require("../database/index");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config()

const app = express();
const router = express();

const salt = 10;
app.use(cors({credentials: true, origin: 'https://yeffso.netlify.app'}));


router.get("/", (req, res) => res.send("Main Register Page"));


router.post("/", async (req, res) => {
  const sql =
  "INSERT INTO users (`FirstName`, `LastName`, `Email`, `PhoneNumber`, `Password`, `Role`) VALUES (?)";
  const RegValue = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.phonenumber,
    req.body.password,
    req.body.role,
  ];
  db.query(sql, [RegValue], (err, result) => {
    if (err) return res.json({ Error: "Error inserting into server" });
    return res.json({ Status: "Success" });
  });
});


module.exports = router;
