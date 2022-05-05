module.exports = (req, res, next) => {
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
    
    if (!req.body.name) {
        return res.status(400).render("products/product-new", {
          errorMessageName: "Please insert a name for the toy you wish to list.", userInSession: req.session.user, newProduct,
        });
      }
    
    if (!req.body.price) {
        return res.status(400).render("products/product-new", {
          errorMessagePrice: "Please insert a price for the toy you wish to list.", userInSession: req.session.user, newProduct,
        });
      }
    
      if (req.body.category === "null") {
        return res.status(400).render("products/product-new", {
          errorMessageCategory: "Please insert a valid category for the toy you wish to list.", userInSession: req.session.user, newProduct,
        });
      }

      req.Product = newProduct;

      next();
}