const db = require("../database/index");

const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'https://yeffso.netlify.app'}));

router.post("/", (req, res) => {
  const sql = "SELECT * FROM users WHERE Email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login Error in server" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Incorrect Password" });
          if (response) {
            const Role = data[0].Role;
            const id = data[0].customer_id;
            const FirstName = data[0].FirstName;
            const token = jwt.sign({ Role, id, FirstName }, "secret-key", {
              expiresIn: "1d",
            });

            res.cookie("token", token, {
              secure: true,
              httpOnly: true,
              sameSite: "none",
            });

            return res.json({
              Status: "Success",
              token,
              FirstName,
              id,
              Role,
            });
          } else {
            return res.json({ Error: "Password Incorrect" });
          }
        }
      );
    } else {
      return res.json({ Error: "No Account Found" });
    }
  });
});

module.exports = router;
