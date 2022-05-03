const Product = require("../models/Product.model");

module.exports = (req, res, next) => {
 const productId = req.params.productId;
 const userId = req.session.user._id;

 Product.findById(productId)
    .populate("seller")
    .then(productFound => {
        const productSellerId = productFound.seller.id;
        if(!(productSellerId === userId)) {
            return res.redirect("/products/error");
        };
        next();
    })
}

