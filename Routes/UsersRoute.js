const db = require("../database/index");
const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const router = express();

app.use(cors());

const verifytoken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You dont have a verified token" });
  } else {
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid Token, Kindly Login Again" });
      } else {
        const userId = decoded.id;
        console.log(
          "id",
          userId,
          decoded.Email,
          decoded.FirstName,
          decoded.Role
        );
        next();
      }
    });
  }
};

router.get("/", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You dont have a verified token" });
  } else {
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid Token, Kindly Login Again" });
      } else {
        const userId = decoded.id;
       
       
        //fetch user next
        const sql =
          "SELECT customer_id , FirstName, LastName, Email, PhoneNumber  FROM users WHERE customer_id = ?";

        db.query(sql, [userId], (err, result) => {
          if (err)
            return res.json({ Error: "Cannot Fetch Users profile" });
          return res.json(result);
        });
      }
    });
  }
});

router.put("/profile", async  (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You dont have a verified token" });
  } else {
    await jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid Token, Kindly Login Again" });
      } else {
        const userId = decoded.id;
        console.log(userId)
        //fetch user next
        const sql =
          "UPDATE users SET `DfirstName`=?, `DlastName`=?, `DphoneNumber`=?, `Dstreet`=?, `Ddirections`=?, `Dcity`=?, `Dstate`=?, `Dlocalgva`=? WHERE ID = ?";

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
            userId,
          ],
          (err, result) => {
            if (err)
              return res.json({ Error: "Cannot Update Profile Address" });
            return res.json({ Status: "Profile Updated Successfully", result });
          }
        );
      }
    });
  }
});

router.put("/profile/edit", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You dont have a verified token" });
  } else {
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid Token, Kindly Login Again" });
      } else {
        const userId = decoded.id;
        //fetch user next
        const sql =
          "UPDATE users SET `FirstName`=?, `LastName`=?, `Email`=?, `Password`=?  WHERE customer_id = ?";
        db.query(
          sql,
          [
            req.body.FirstName,
            req.body.LastName,
            req.body.Email,
            req.body.Password,
            userId,
          ],
          (err, result) => {
            if (err)
              return res.json({ Error: "Cannot Update Profile Address" });
            return res.json({ Status: "Profile Updated Successfully", result });
          }
        );
      }
    });
  }
});

module.exports = router;
