const db = require("../database/index")
const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = express.Router();


app.use(cors());

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res.redirect("https://yeffso.netlify.app/");
      } else {
        next();
      }
    });
  } else {
    return res.redirect("https://yeffso.netlify.app/");
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO products (`ProductName`, `Price`, `Color`, `ProductDetails`, `Type`, `ProductAttach` ) VALUES (?)";
  const image = req.file.filename;
  const values = [
    req.body.ProductName,
    req.body.Price,
    req.body.Color,
    req.body.ProductDetails,
    req.body.category,
    image,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Error inserting into server" });
    return res.json({ Status: "Success" });
  });
});

router.get("/", requireAuth, (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Cannot Fetch Data" });
    return res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM products WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Cannot Fetch Data" });
    return res.json(result);
  });
});

router.put("/:id", (req, res) => {
  const sql =
    "UPDATE products SET `ProductName`=?, `Price`=?, `Color`=?, `ProductDetails`=? WHERE ID = ?";
  const id = req.params.id;

  db.query(
    sql,
    [
      req.body.NewproductName,
      req.body.NewPrice,
      req.body.NewColor,
      req.body.NewProductDetails,
      id,
    ],
    (err, result) => {
      if (err) return res.json({ Error: "Cannot Update" });
      return res.json({ Status: "Product Updated Successfully", result });
    }
  );
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM products WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Cannot Delete" });
    return res.json({ Success: "Product Deleted Successfully" });
  });
});

module.exports = router;