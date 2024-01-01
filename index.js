const db = require("./database/index")
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
require('dotenv').config()
 


const app = express();
app.use(cors({credentials: true, origin: 'https://yeffso.netlify.app'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const MenRouter = require("./Routes/MensRoutes");
const LoginRoute = require("./Routes/LoginRoute");
const RegisterRoute = require("./Routes/RegisterRoute");
const WomenRoute = require("./Routes/WomenRoute");
const BeltsRoute = require("./Routes/BeltsRoute");
const KidsRoute = require("./Routes/KidsRoute");
const ProductsRoutes = require("./Routes/ProductsRoutes");
const UsersRoute = require("./Routes/UsersRoute")

app.use("/men", MenRouter);
app.use("/women/", WomenRoute);
app.use("/belts", BeltsRoute);
app.use("/kids", KidsRoute);
app.use("/login", LoginRoute);
app.use("/register", RegisterRoute);
app.use("/products", ProductsRoutes);
app.use("/users", UsersRoute)



const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Not logged In" });
  } else {
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid Token, Kindly Login Again" });
      } else {
        req.Email = decoded.Email;
        req.Role = decoded.Role;
        req.id = decoded.id;
        req.FirstName = decoded.FirstName;
        next();
      }
    });
  }
};


app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", Email: req.Email, Role: req.Role , id: req.id, FirstName: req.FirstName });
});

app.get("/user/:id", (req, res) => {
  const sql =
    "SELECT id, FirstName, LastName, Email, PhoneNumber, DfirstName, DlastName, DphoneNumber, Dstreet, Ddirections, Dcity, Dstate, Dlocalgva  FROM users WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Cannot Fetch Data Users profile" });
    return res.json(result);
  });
});


app.get("/logout", async (req, res) => {
  res.status(202).clearCookie('token').send('cookie cleared')
  res.redirect("/")
});


const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  console.log("server listening on port 8081");
})

