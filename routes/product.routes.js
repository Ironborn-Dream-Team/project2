const Product = require("../models/Product.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const addFavourite = require("../middleware/addFavourite");
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
router.post("/create", upload.array('images', 5), isLoggedIn, (req, res, next) => {
    var images = [];
    req.files.forEach(file => {
        images.push('/' + file.path)
    });

    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        description: req.body.description,
        images: images,
        seller: req.session.user._id,
        category: req.body.category
    }

    Product.create(newProduct)
        .then(createdProduct => {
            res.render("products/product-details", { productFound: createdProduct });
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
router.get("/search", (req, res, next) => {
    const searchInput = req.query.searchInput;

    const searchTerms = {
        name: { "$regex": `${searchInput}`, "$options": "i" },
        price: {$gte: req.query.minPrice, $lte: req.query.maxPrice},
        minAge: {$gte: req.query.minAge},
        maxAge: {$lte: req.query.maxAge},
        category: req.query.category
    }

    if (req.query.category === "null") delete searchTerms.category;

    // Improve if found way to pass null values for minAge and maxAge
    // for (const key in searchTerms) {
    //     console.log(searchTerms[key]);
    //     if (searchTerms[key] === "null") delete searchTerms[key];
    // }

    console.log(searchTerms);

    // Using the mongoose operator to include regular expressions in the queries. Search for all the elements
    // that include nintendo on the name
    Product.find(searchTerms)
        .then(searchResults => {
            console.log(searchResults);
            res.render("products/product-search-results", {searchResults: searchResults});
        })
})

//Get the details of a specific product -- WORKING!!!!
router.get("/:productId", isLoggedIn, (req, res, next) => {
    const productId = req.params.productId;
    const userFavourites = req.session.user.favourites;
    let isFavourite = false;

    if (userFavourites.find(favourite => favourite = productId)) {
        isFavourite = true;
    }

    Product.findById(productId)
        .populate("seller")
        .then(productFound => {
            res.render("products/product-details", { productFound: productFound, isFavourite: isFavourite });
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
router.post("/:productId/edit", upload.array('images', 5), isLoggedIn, isOwner, (req, res, next) => {
    const productId = req.params.productId;

    var images = [];
    req.files.forEach(file => {
        images.push('/' + file.path)
    });

    const newProductInfo = {
        name: req.body.name,
        price: req.body.price,
        minAge: req.body.minAge,
        maxAge: req.body.maxAge,
        description: req.body.description,
        images: images,
    }
    console.log(newProductInfo.images)

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
    // addFavourite({productId: req.params.productID, userId: req.session.user._id});

    const productId = req.params.productID;
    const userId = req.session.user._id;

    User.findByIdAndUpdate(userId, { $push: { favourites: productId } }, { new: true })
        .then(updatedUser => {
            req.session.user = updatedUser;
            return Product.findById(productId);
        })
        .then(productFromDb => {
            return productFromDb.populate("seller");
        })
        .then(productFound => {
            res.render("products/product-details", { productFound: productFound, isFavourite: true });
        })
        .catch(error => {
            console.log("There was an error adding the product to the favourites:", error);
            next(error);
        })
})

router.post("/:productID/removefavourite", (req, res, next) => {
    const productId = req.params.productID;
    const userId = req.session.user._id;

    User.findByIdAndUpdate(userId, { $pull: { favourites: productId } }, { new: true })
        .then(updatedUser => {
            req.session.user = updatedUser;
            return Product.findById(productId);
        })
        .then(productFromDb => {
            return productFromDb.populate("seller");
        })
        .then(productFound => {
            res.render("products/product-details", { productFound: productFound, isFavourite: false });
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
            .then(dollsArray => {
                console.log(dollsArray)
                res.render("products/product-categories", { productsFound: dollsArray });
            })
            .catch(error => error);
    })
}


module.exports = router;