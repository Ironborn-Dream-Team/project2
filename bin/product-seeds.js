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
        seller: "627399992a1667da744bf5fe",
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
        seller: "627399992a1667da744bf5ff",
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
        seller: "627399992a1667da744bf5ff",
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
        seller: "627399992a1667da744bf5ff",
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
        seller: "627399992a1667da744bf5ff",
        category: ["other"]
    },
    {
        name: "LEGO Classic - Bricks Bricks Bricks",
        price: 50,
        minAge: 3,
        maxAge: 10,
        description: "Lego classic set of bricks. Still has all the bricks. Your kid can make a lot of stuff with it",
        images: [],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5ff",
        category: ["lego"]
    },
    {
        name: "Puzzle map",
        price: 12,
        minAge: 3,
        maxAge: 10,
        description: "Sell a France map puzzle. Good condition",
        images: ["https://www.cdiscount.com/pdt2/1/1/0/1/700x700/gue103110/rw/vilac-puzzle-carte-de-france-magnetique.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["puzzles"]
    },
    {
        name: "Lego DC Comics - Mobile Batbase",
        price: 90,
        minAge: 8,
        maxAge: 99,
        description: "Perfect lego mobile base for batman. it's a truck that doubles in function as the base to batman. Still as new.",
        images: ["https://www.toysrus.pt/medias/?context=bWFzdGVyfHByb2R1Y3RfaW1hZ2VzfDQ2MTE5fGltYWdlL2pwZWd8aDliL2gzNi8xMDAyODExMjgzODY4Nnw4MzljYmZlZTMzYTM2NzA1MTg2ZWQ0NmNmOGI2ZjkxNjVhOTZiMzNmMGM2ZGEwNTFhMmZkODliZjM5MTAyZjE1", "https://live.staticflickr.com/65535/50186930718_a76abb489a_b.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["lego"]
    },
    {
        name: "Lego Creator - Sports Car",
        price: 12,
        minAge: 6,
        maxAge: 99,
        description: "Lego creator sports car still with the original box",
        images: ["https://m.media-amazon.com/images/I/81ZwS4MhuoL._AC_SL1500_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["lego"]
    },
    {
        name: "Lego DUPLO - Unicorn",
        price: 7,
        minAge: 1,
        maxAge: 6,
        description: "Unicorn toy car by lego Duplo collection. A really good toy for your baby.",
        images: ["https://www.babyshop.com/images/834898/card_xlarge.jpg", "https://www.kidinn.com/f/13798/137984809/lego-duplo-10953-unicorn.jpg", "https://m.media-amazon.com/images/I/71lNJASyr5L._AC_SY450_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["lego"]
    },
    {
        name: "Lego Imperial Star Destroyer",
        price: 450,
        minAge: 16,
        maxAge: 99,
        description: "Possibly the best lego set ever created, composed of 35 thousand pieces, it's packed full of details.",
        images: ["https://www.lego.com/cdn/cs/set/assets/blt40f9e43bbfb9020b/75252_alt1.jpg?fit=bounds&format=jpg&quality=80&width=528&height=528&dpr=1", "https://www.lego.com/cdn/cs/set/assets/blt934044fa508776e2/75252.jpg?fit=bounds&format=jpg&quality=80&width=1500&height=1500&dpr=1"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["lego"]
    },
    {
        name: "Peppa Pig Picnic Set",
        price: 10,
        minAge: 1,
        maxAge: 5,
        description: "10-PIECE PICNIC PLAYSET: Preschoolers can play out picnic stories with the included 2-piece duck pond, picnic basket, picnic table, pie, grill, 2 scooters, and 2 figures",
        images: ["https://m.media-amazon.com/images/I/510xL+jnXqL._AC_SL1000_.jpg", "https://m.media-amazon.com/images/I/612pcAMLuhL._AC_SL1000_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["baby"]
    },
    {
        name: "Spider Man Action Figure",
        price: 5,
        minAge: 3,
        maxAge: 12,
        description: "12-Inch scale Spider-Man figure - Imagine Peter Parker suiting up as the friendly, neighborhood Spider-Man with this 12-inch-scale Spider-Man figure, inspired by the classic character design from the Marvel Comics.",
        images: ["https://m.media-amazon.com/images/I/71N253Vb8mL._AC_SL1500_.jpg", "https://m.media-amazon.com/images/I/81Kyshw7yqL._AC_SL1500_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["dolls"]
    },
    {
        name: "Farm Animals Sound Shape Matching",
        price: 4,
        minAge: 0,
        maxAge: 4,
        description: "Hear eight realistic animal sounds with this 8-piece wooden sound puzzle with the sturdy wooden puzzle board.Full-color matching picture under each wooden peg puzzle piece. Eye- and ear-catching puzzle enhances matching and listening skills.",
        images: ["https://m.media-amazon.com/images/I/81ef3yjhSIL._AC_SL1500_.jpg", "https://m.media-amazon.com/images/I/71Wqdbdyb4L._AC_SL1500_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["puzzles"]
    },
    {
        name: "Star Wars - You were The Chosen One - 2000 Piece Jigsaw Puzzle",
        price: 15,
        minAge: 6,
        maxAge: 99,
        description: "Contains a 2000 piece jigsaw puzzle. Finished size is 100 cm. X 70 cm. Full Color Bonus poster included for help in solving. ",
        images: ["https://m.media-amazon.com/images/I/A1bz5zB3A0L._AC_SL1500_.jpg", "https://m.media-amazon.com/images/I/91xgbmBKunL._AC_SL1500_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["puzzles"]
    },
    {
        name: "Educational 6 Animal Shape Jigsaw",
        price: 15,
        minAge: 0,
        maxAge: 4,
        description: "SAFE WOODEN PUZZLE-BPA Free,made of high-quality environmental wood with non-toxic water-based paint. Easy-to-grasp pieces with smooth edge,keeps your 1 2 3 years old boys and girls play safety.",
        images: ["https://m.media-amazon.com/images/I/71cRwGscHPL._AC_SL1200_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["baby"]
    },
    {
        name: "Fifa 17",
        price: 10,
        minAge: 4,
        maxAge: 99,
        description: "Selling my copy of Fifa 17, too old to play this now.",
        images: ["https://i.imgur.com/oEPc0aT.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf5fe",
        category: ["videoGames"]
    },
    {
        name: "Cyberpunk 2077 ps4",
        price: 20,
        minAge: 18,
        maxAge: 99,
        description: "Selling PS4 Cyberpunk game. Still as new with no scratches.",
        images: ["https://i.imgur.com/KJQuz8w.jpg", "https://i.imgur.com/LrD0feo.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["videoGames"]
    },
    {
        name: "Disney Princess Deluxe Rapunzel Styling Head",
        price: 12,
        minAge: 4,
        maxAge: 12,
        description: "The Disney Princess Rapunzel Deluxe Styling Head holds endless hair play possibilities. Rapunzel features her iconic long blonde hair that is perfect for brushing and styling.",
        images: ["https://i.imgur.com/75Fibed.jpg", "https://m.media-amazon.com/images/I/91ZOwSr0jxL._AC_SL1500_.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["dolls"]
    },
    {
        name: "Barbie Dreamtopia Rainbow Magic Mermaid Doll",
        price: 9,
        minAge: 4,
        maxAge: 12,
        description: "Barbie mermaid doll features a neon-bright fantasy look with a tiara in her rainbow hair, a multi-colored tail and a bodice with sea-inspired accents.",
        images: ["https://i.imgur.com/f4PtaTk.jpg", "https://i.imgur.com/olUvqRK.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["dolls"]
    },
    {
        name: "LEGO Minecraft The Fox",
        price: 25,
        minAge: 4,
        maxAge: 15,
        description: "Play-packed fun - LEGO Minecraft The Fox Lodge (21178) is bursting with characters, accessories and features to inspire endless creative play",
        images: ["https://i.imgur.com/GI9jnQm.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["lego"]
    },
    {
        name: "Sassy Stacks of Circles Stacking Ring ",
        price: 5,
        minAge: 0,
        maxAge: 3,
        description: "Straight post accepts different sized rings, strengthening hand-eye coordination. Chunky rings make it easy for baby to grasp, strengthening fine motor skills",
        images: ["https://i.imgur.com/bHaBtXI.jpg", "https://i.imgur.com/I9aBRXO.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["baby"]
    },
    {
        name: "Nuby Floating Purple Octopus",
        price: 5,
        minAge: 3,
        maxAge: 6,
        description: "The Octopus Hoopla is a floating bath toy with 3 rings that encourages interactive play; Your child will be wrapped up in fun for hours, or at least until bath time is over",
        images: ["https://i.imgur.com/ogEOJip.jpg", "https://i.imgur.com/cXpiWOJ.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["baby"]
    },
    {
        name: "Electronic Dancing Cactus Toy with Lighting",
        price: 17,
        minAge: 3,
        maxAge: 10,
        description: "Dancing cactus that plays music and repeats all that you say.",
        images: ["https://i.imgur.com/LxTc30V.jpg", "https://i.imgur.com/MO8smdA.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["other"]
    },
    {
        name: "The Original Slinky Walking Spring Toy",
        price: 2,
        minAge: 5,
        maxAge: 15,
        description: "The original slinky, still with original box!",
        images: ["https://i.imgur.com/yghHKfe.jpg", "https://i.imgur.com/etdILfr.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["other"]
    },
    {
        name: "Pack of 200 plastic balls in bag",
        price: 20,
        minAge: 5,
        maxAge: 15,
        description: "Pack of 200 plastic balls. Perfect to fill a kid's play pit and let your kid go wild with it, so you can still find plastic balls around your garden 3 years later.",
        images: ["https://i.imgur.com/9kfr9Y3.jpg"],
        // seller: "626fa16f2b4ec3f17b3f102e"//Suzanne
        seller: "627399992a1667da744bf600",
        category: ["other"]
    },
]



Product.create(products)
    .then(productsSeeded => {
        console.log(`Created ${productsSeeded.length} products`);
    })
    .catch(error => {
        console.log("There was an error seeding the products in the database", error);
    })