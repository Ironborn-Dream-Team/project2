const Product = require("../models/Product.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const router = require("express").Router();

// Display the list of all the toys for sale
// Don't show contacts of sellers unless user is logged in
// Maybe use handlebars for that, (if user in session, show elements)
router.get("/", (req, res, next) => {
  Product.find()
    .then(productsArray => {
      res.render("products/product-list", {productList: productsArray});
    })
    .catch(error => {
      console.log("There was an error getting the product list from the database:", error);
      next(error);
    });
});


//Get the details of a specific product
router.get("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .populate("seller")
        .then(productFound => {
            res.render("products/product-details", productFound);
        })
        .catch(error => {
            console.log("There was an error getting the product information from the database:", error);
            next(error);
        });
})

//Get the form to create a new product
router.get("/create", (req, res, next) => {
    res.render("products/product-new");
})

// Send the information of the new product to the database
router.post("/create", (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        description: req.body.description,
        seller: req.session.User._id
    }


    Product.create(newProduct)
        .then(createdProduct => {
            res.render("products/product-details", createdProduct);
        })
        .catch(error => {
            console.log("There was an error creating the new listing:", error);
            next(error);
        });

})


// Get the form to edit the information of a product

router.get("/:productId/edit", (req, res, next) => {
    /* Insert validation trying to match the user online with the userId of the seller of the product being edited
     If it's the same, let him through, if not, redirect to failure page

    if () {

    }
    */
    const productId = req.params.productId;
    
    Product.findById(productId)
        .then(productFound => {
            res.render("products/product-edit", productFound);
        })
        .catch(error => {
            console.log("There was an error getting the product information from the database:", error);
            next(error);
        })
})


// Post the edited product on the database
router.post("/:productId/edit", (req,res,next) => {
    const productId = req.params.productId;

    const newProductInfo = {
        name: req.body.name,
        price: req.body.price,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        description: req.body.description,
    }

    Product.findByIdAndUpdate(productId, newProductInfo)
        .then(productUpdated => {
            res.render("products/product-details", productUpdated);
        })
        .catch(error => {
            console.log("There was an error updating the product information on the database:", error);
            next(error);
        })
})

// Delete product from database
router.post("/:productId/delete", (req, res, next) => {
    const productId = req.params.productId;
    
    Product.findByIdAndDelete(productId)
        .then(() => {
            res.redirect("/products/product-list")
        })
})

module.exports = router;