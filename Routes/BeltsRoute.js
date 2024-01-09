const db = require("../database/index")
const express = require("express");
const cors = require("cors");



const app = express();
const router = express();
app.use(cors());
  

  router.get("/", (req, res) => {
    const sql = "SELECT * FROM products WHERE Type='Belt' ORDER BY id DESC ";
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