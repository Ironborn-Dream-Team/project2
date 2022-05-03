const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Product = require("../models/Product.model");



router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});



router.post("/signup", isLoggedOut, (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your email.",
    });
  }

  if (password.length < 5) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 5 characters long.",
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email }).then((found) => {
    // If the user is found, send the message email is taken
    if (found) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: "email already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          email,
          password: hashedPassword,
          username: req.body.username,
          numberPhone: req.body.numberPhone,
          address: req.body.address
        });
      })
      .then((user) => {
        // Bind the user to the session object
        req.session.user = user;
        res.redirect("/");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/signup", {
            errorMessage:
              "email need to be unique. The email you chose is already in use.",
          });
        }
        return res
          .status(500)
          .render("auth/signup", { errorMessage: error.message });
      });
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your email.",
    });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 5) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 5 characters long.",
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).render("auth/login", {
          errorMessage: "Wrong credentials.",
        });
      }

      // If user is found based on the email, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).render("auth/login", {
            errorMessage: "Wrong credentials.",
          });
        }
        req.session.user = user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect("/");
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});


// READ: PROFILE PAGE - WORKING!!!!!!!
router.get('/user-profile', isLoggedIn, (req, res) => {
  let sellerProducts;

  Product.find({seller: req.session.user._id})
    .then(productsFound => {
      sellerProducts = productsFound;
      // This query gives us an object with 2 keys: Id of the user and an array of favourites.
      return User.findById(req.session.user._id, "favourites").populate("favourites");
    })
    .then(favourites => {
      //we have to do favouritesArray: favourites.favourites so we can put on the hbs just the favourites array we got on the query, without the userId.
      res.render('users/user-profile', {userInSession: req.session.user, sellerProducts: sellerProducts, favouritesArray: favourites.favourites});
    })
});


// UPDATE: PROFILE PAGE - WORKING !!!!!!!!!!!
router.get('/user-profile/edit', isLoggedIn, (req, res) => {
  res.render('users/user-edit', { userInSession: req.session.user });
});


router.post('/user-profile/edit', isLoggedIn, (req, res, next) => {
  const idToEdit = req.session.user._id;
  

  const newInfo = {
    username: req.body.username,
    numberPhone: req.body.numberPhone,
    address: req.body.address
  };


  User.findByIdAndUpdate(idToEdit, newInfo, {new: true})
    .then(updatedUser => {
      req.session.user = updatedUser;
      res.redirect("/auth/user-profile");
    })
    .catch(err => {
      console.log("error updating book in DB", err)
      next(err);
    });
});

// LOGOUT - WORKING!!!!
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
