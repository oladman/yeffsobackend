const db = require("../database/index")
const express = require("express");
const multer = require('multer');
const mysql = require("mysql");
const path = require("path");



const router = express.Router();

  
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


router.post('/', upload.single("image"), (req, res) => {
    const sql =
      "INSERT INTO products (`ProductName`, `Price`, `Color`, `ProductDetails`, `ProductAttach`) VALUES (?)";
    const image = req.file.filename;
    const values = [
      req.body.ProductName,
      req.body.Price,
      req.body.Color,
      req.body.ProductDetails,
      image,
    ];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Error inserting into server" });
      return res.json({ Status: "Success" });
    });
  })


  router.get("/", (req, res) => {
    const sql = "SELECT * FROM products WHERE Type='Women'";
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





module.exports = router;