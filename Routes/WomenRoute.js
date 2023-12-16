const db = require("../database/index")
const express = require("express");
const multer = require('multer');
const path = require("path");
const cors = require("cors");


const app = express();
const router = express();

app.use(cors());

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