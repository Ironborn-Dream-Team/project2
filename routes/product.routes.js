const Product = require("../models/Product.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const formValidation = require("../middleware/formValidation");
const searchQuery = require("../middleware/searchQuery");
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


// Get the form to create a new product -- WORKING!!!
router.get("/create", isLoggedIn, (req, res, next) => {
    res.render("products/product-new", { userInSession: req.session.user });
})

// Send the information of the new product to the database
router.post("/create", upload.array('images', 5), isLoggedIn, formValidation, (req, res, next) => {
    const newProduct = req.Product;

    Product.create(newProduct)
        .then(createdProduct => {
            res.redirect(`/products/${createdProduct._id}`);
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

// Showing search Results
router.get("/search", searchQuery, (req, res, next) => {
    // req.searchInfo is being added on the searchQuery Middleware
    const searchTerms = req.searchInfo;

    Product.find(searchTerms)
        .then(searchResults => {
            console.log(searchResults);
            res.render("products/product-search-results", { searchResults: searchResults });
        })
})

//Get the details of a specific product -- WORKING!!!!
router.get("/:productId", isLoggedIn, (req, res, next) => {
    const productId = req.params.productId;
    const userFavourites = req.session.user.favourites;
    let isCreator;

    let isFavourite = false;

    if (userFavourites.find(favourite => favourite === productId)) {
        isFavourite = true;
    }

    Product.findById(productId)
        .populate("seller")
        .then(productFound => {

            if(productFound.seller._id == req.session.user._id) isCreator = true;
            
            res.render("products/product-details", { productFound: productFound, isFavourite: isFavourite, isCreator: isCreator});
        })
        .catch(error => {
            console.log("There was an error getting the product information from the database:", error);
            next(error);
        });
})



// Get the form to edit the information of a product -- WORKING!!!
router.get("/:productId/edit", isLoggedIn, isOwner, (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(productFound => {
            console.log(productFound)
            res.render("products/product-edit", { productFound, userInSession: req.session.user });
        })
        .catch(error => {
            console.log("There was an error getting the product information from the database:", error);
            next(error);
        })
})


// Post the edited product on the database -- WORKING!!!
router.post("/:productId/edit", upload.array('images', 5), isLoggedIn, isOwner, formValidation, (req, res, next) => {
    const productId = req.params.productId;

    const newProductInfo = req.Product;

    Product.findByIdAndUpdate(productId, newProductInfo, { new: true })
        .then(productUpdated => {
            console.log(productUpdated)
            res.redirect(`/products/${productUpdated._id}`)
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
        .catch(error => {
            console.log("There was an error deleting the product information on the database:", error);
            next(error);
        })
})

router.post("/:productID/addfavourite", (req, res, next) => {
    const productId = req.params.productID;
    const userId = req.session.user._id;
    let isCreator;

    User.findByIdAndUpdate(userId, { $push: { favourites: productId } }, { new: true })
        .then(updatedUser => {
            req.session.user = updatedUser;
            return Product.findById(productId);
        })
        .then(productFromDb => {
            return productFromDb.populate("seller");
        })
        .then(productFound => {
            res.redirect(`/products/${productId}`);
        })
        .catch(error => {
            console.log("There was an error adding the product to the favourites:", error);
            next(error);
        })
})

router.post("/:productID/removefavourite", (req, res, next) => {
    const productId = req.params.productID;
    const userId = req.session.user._id;
    let isCreator;

    User.findByIdAndUpdate(userId, { $pull: { favourites: productId } }, { new: true })
        .then(updatedUser => {
            req.session.user = updatedUser;
            return Product.findById(productId);
        })
        .then(productFromDb => {
            return productFromDb.populate("seller");
        })
        .then(productFound => {
            res.redirect(`/products/${productId}`);
        })
        .catch(error => {
            console.log("There was an error adding the product to the favourites:", error);
            next(error);
        })
})



// Display the list of each category -- WORKING!!!
const categories = ["dolls", "lego", "videoGames", "baby", "puzzles", "other"]
for (let i = 0; i < categories.length; i++) {
    router.get(`/categories/${categories[i]}`, (req, res, next) => {
        Product.find({ category: [categories[i]] })
            .then(categoryArray => {
                // console.log(categoryArray)
                res.render("products/product-categories", { productsFound: categoryArray });
            })
            .catch(error => error);
    })
}




module.exports = router;