module.exports = (req, res, next) => {

    const searchInput = req.query.searchInput;
    const category = req.query.category;
    const minAge = req.query.minAge;
    const maxAge = req.query.maxAge;

    let minPrice, maxPrice;
    
    switch (req.query.price) {
        case "null":
            minPrice = "null";
            maxPrice = "null";
            break;
        case "lowPrice":
            minPrice = 0;
            maxPrice = 20;
            break;
        case "averagePrice":
            minPrice = 20;
            maxPrice = 100;
            break;
        case "expensive":
            minPrice = 100;
            maxPrice = 99999;
            break;
    }
    
    const searchTerms = {
        name: { "$regex": `${searchInput}`, "$options": "i" },
        price: {$gte: minPrice, $lte: maxPrice},
        minAge: {$gte: minAge},
        maxAge: {$lte: maxAge},
        category: category
    }

    
    // if (searchInput === "null") delete searchTerms.name;
    if (minPrice === "null") delete searchTerms.price;
    if (minAge === "null") delete searchTerms.minAge;
    if (maxAge === "null") delete searchTerms.maxAge;
    if (req.query.category === "null") delete searchTerms.category;
    

    req.searchInfo = searchTerms;
    
    next()
}
