const mongoose = require("mongoose");
const Product = require("../models/Product.model");

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/project2';

mongoose
    .connect(MONGO_URI)
    .then(x => {
        console.log(`Connected to mongo! Database name: ${x.connections[0].name}`);
    })
    .catch(error => {
        console.log("Error connectiong to mongo:", error);
    });

const products = [
    {
        name: "Super Nintendo Lego Set",
        price: 100,
        minAge: 18,
        maxAge: 99,
        description: "Super nintendo lego set with super mario bros playing on the lego tv.",
        images: ["https://i.imgur.com/J4SCojU.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "6271c354429714c6a59a1ff2",
        category: ["lego"]
    },
    {
        name: "Action Man - Aqua Blaster",
        price: 35,
        minAge: 3,
        maxAge: 99,
        description: "Action man aqua blaster action figure. In tip top shape. Still with original box.",
        images: ["https://i.imgur.com/9RA8dYT.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102f"
        seller: "6271c354429714c6a59a1ff4",
        category: ["videoGames"]
    },
    {
        name: "Barbie Doll - Vacation",
        price: 15,
        minAge: 3,
        maxAge: 10,
        description: "Barbie doll on vacation will all stickers and accessories.",
        images: ["https://i.imgur.com/zlG7CHb.jpg"],
        // seller: "626fa16f2b4ec3f17b3f1030"
        seller: "6271c354429714c6a59a1ff4",
        category: ["dolls"]
    },
    {
        name: "Blue's Clues Plush",
        price: 25,
        minAge: 0,
        maxAge: 10,
        description: "Blues Clues collectible plush! If your kid is having the blues, I'll give you some clues! Get the Blues Clues to end the blues!",
        images: ["https://i.imgur.com/W5FbWuP.jpg"],
        // seller: "626fa16f2b4ec3f17b3f1030"
        seller: "6271c354429714c6a59a1ff3",
        category: ["baby"]
    },
    {
        name: "Lot of Tchoupi books",
        price: 65,
        minAge: 0,
        maxAge: 6,
        description: "Lot of classic tchoupi books in fair condition. They are reattached cleanly with tape and some have some writing marks on the inside.! But you can read 100 times, without ever getting bored.",
        images: ["https://i.ebayimg.com/images/g/jjAAAOSwnB1h6JaV/s-l1600.jpg", "https://i.ebayimg.com/images/g/xLgAAOSw0pth6JaY/s-l1600.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "6271c354429714c6a59a1ff2",
        category: ["other"]
    },
    {
        name: "Puzzle map",
        price: 12,
        minAge: 3,
        maxAge: 10,
        description: "Sell a France map puzzle. Good condition",
        images: ["https://www.cdiscount.com/pdt2/1/1/0/1/700x700/gue103110/rw/vilac-puzzle-carte-de-france-magnetique.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "6271c354429714c6a59a1ff2",
        category: ["puzzles"]
    },
]



Product.create(products)
    .then(productsSeeded => {
        console.log(`Created ${productsSeeded.length} products`);
    })
    .catch(error => {
        console.log("There was an error seeding the products in the database", error);
    })