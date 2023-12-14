const db = require("../database/index")
const express = require("express");
const multer = require("multer");
const mysql = require("mysql");
const path = require("path");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.get("/:id", (req, res) => {
  const sql =
    "SELECT id, FirstName, LastName, Email, PhoneNumber, DfirstName, DlastName, DphoneNumber, Dstreet, Ddirections, Dcity, Dstate, Dlocalgva  FROM users WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Cannot Fetch Data Users profile" });
    return res.json(result);
  });
});

router.put("/profile/:id", (req, res) => {
  const sql =
    "UPDATE users SET `DfirstName`=?, `DlastName`=?, `DphoneNumber`=?, `Dstreet`=?, `Ddirections`=?, `Dcity`=?, `Dstate`=?, `Dlocalgva`=? WHERE ID = ?";
  const id = req.params.id;

  db.query(
    sql,
    [
      req.body.Dfirstname,
      req.body.Dlastname,
      req.body.Dphonenumber,
      req.body.Ddeliveryad,
      req.body.Ddirections,
      req.body.Dcity,
      req.body.Dstate,
      req.body.Dlocalgva,
      id,
    ],
    (err, result) => {
      if (err) return res.json({ Error: "Cannot Update Profile Address" });
      return res.json({ Status: "Profile Updated Successfully", result });
    }
  );
});

router.put("/profile/edit/:id", (req, res) => {
  const sql =
    "UPDATE users SET `FirstName`=?, `LastName`=?, `Email`=?, `Password`=?  WHERE ID = ?";
  const id = req.params.id;

  db.query(
    sql,
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.Email,
      req.body.Password,
      id,
    ],
    (err, result) => {
      if (err) return res.json({ Error: "Cannot Update Profile Address" });
      return res.json({ Status: "Profile Updated Successfully", result });
    }
  );
});

module.exports = router;
