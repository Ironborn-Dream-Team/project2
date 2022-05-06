const router = require("express").Router();
const Product = require("../models/Product.model");

// GET home page + Display the deal of the day 
router.get("/", (req, res, next) => {
  Product.find()
    .then(productsArray => {
      const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
      const arrRandom = shuffled.slice(0, 3);
      // console.log("shuffled     ", shuffled.length)
      res.render("index", arrRandom );
    })
    .catch(error => error);
})

module.exports = router;
