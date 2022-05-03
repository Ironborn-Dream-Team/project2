const Product = require("../models/Product.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const isOwner = require("../middleware/isOwner");
const router = require("express").Router();

// To upload image 
const multer = require('multer');
const upload = multer({ dest: 'public/images/uploads/' })



// Display the list of all the toys for sale -- WORKING!!!
router.get("/", (req, res, next) => {
    Product.find()
        .then(productsArray => {
            res.render("products/product-list", { productsFound: productsArray });
        })
        .catch(error => {
            console.log("There was an error getting the product list from the database:", error);
            next(error);
        });
});

//Get the form to create a new product
router.get("/create", isLoggedIn, (req, res, next) => {
    res.render("products/product-new", { userInSession: req.session.user });
})

// Send the information of the new product to the database
router.post("/create", upload.single('image'), isLoggedIn, (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        description: req.body.description,
        image: '/' + req.file.path,
        seller: req.session.user._id
    }


    Product.create(newProduct)
        .then(createdProduct => {
            // res.redirect("/products");

            res.render("products/product-details", createdProduct);
        })
        .catch(error => {
            console.log("There was an error creating the new listing:", error);
            next(error);
        });

})

// Blocking page for when user doesn't have access to change
router.get("/error", (req, res, next) => {
    res.render("products/product-error");
})

//Get the details of a specific product -- WORKING!!!!
router.get("/:productId", isLoggedIn, (req, res, next) => {
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

// Get the form to edit the information of a product -- WORKING!!!
router.get("/:productId/edit", isLoggedIn, isOwner, (req, res, next) => {
    /* Insert validation trying to match the user online with the userId of the seller of the product being edited
     If it's the same, let him through, if not, redirect to failure page
 
    if (req.se) {
 
    }
    */
    const productId = req.params.productId;

    Product.findById(productId)
        .then(productFound => {
            res.render("products/product-edit", { productFound, userInSession: req.session.user });
        })
        .catch(error => {
            console.log("There was an error getting the product information from the database:", error);
            next(error);
        })
})


// Post the edited product on the database -- WORKING!!!
router.post("/:productId/edit", isLoggedIn, isOwner, (req, res, next) => {
    const productId = req.params.productId;

    const newProductInfo = {
        name: req.body.name,
        price: req.body.price,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        description: req.body.description,
        image: req.body.image
    }

    Product.findByIdAndUpdate(productId, newProductInfo, { new: true })
        .then(productUpdated => {
            // res.render("products/product-details", { productUpdated, userInSession: req.session.user });
            res.redirect(`/products/${productUpdated._id}`)
            // res.render("products/product-edit", {productUpdated, userInSession: req.session.user});
        })
        .catch(error => {
            console.log("There was an error updating the product information on the database:", error);
            next(error);
        })
})

// Delete product from database -- WORKING!!!
router.post("/:productId/delete", isLoggedIn, isOwner, (req, res, next) => {
    const productId = req.params.productId;

    console.log(productId);

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.redirect("/auth/user-profile")
        })
})



module.exports = router;