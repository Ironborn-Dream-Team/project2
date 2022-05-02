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
        image: "https://i.imgur.com/J4SCojU.jpg"
    },
    {
        name: "Action Man - Aqua Blaster",
        price: 35,
        minAge: 3,
        maxAge: 99,
        description: "Action man aqua blaster action figure. In tip top shape. Still with original box.",
        image: "https://i.imgur.com/9RA8dYT.jpg"
    },
    {
        name: "Barbie Doll - Vacation",
        price: 15,
        minAge: 3,
        maxAge: 10,
        description: "Barbie doll on vacation will all stickers and accessories.",
        image: "https://i.imgur.com/zlG7CHb.jpg"
    },
    {
        name: "Blue's Clues Plush",
        price: 25,
        minAge: 0,
        maxAge: 10,
        description: "Blues Clues collectible plush! If your kid is having the blues, I'll give you some clues! Get the Blues Clues to end the blues!",
        image: "https://i.imgur.com/W5FbWuP.jpg"
    }
]



Product.create(products)
    .then(productsSeeded => {
        console.log(`Created ${productsSeeded.length} products`);
    })
    .catch(error => {
        console.log("There was an error seeding the products in the database", error);
    })