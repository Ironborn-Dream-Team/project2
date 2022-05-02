const mongoose = require('mongoose');
const { count } = require('../models/User.model');
const User = require('../models/User.model');


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/project2';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const users = [
  {
    username: "Suzanne",
    email: "suzanne@gmail.com",
    password: "$2b$10$TYxBPEY5Hjtc393G2FWT/ePf7Rdj0JCMAzYICWIjZYLR2Ez1jxDpm", // suzy123
    numberPhone: 0142464364364,
    timestamps: true
  },
  {
    username: "Bob",
    email: "bob@gmail.com",
    password: "$2b$10$I2H0swrwp.piDsK5wgVfO.gsJNEswKYHmFyCJDPPSDjzUB09imiOG", // bobbybob
    numberPhone: 5356765323456,
    timestamps: true
  },
  {
    username: "Claire",
    email: "claire@gmail.com",
    password: "$2b$10$hhlRSJjZZ/2Kk.VAmkDHh.0NdgyTve.THNwRmCejvXgOQ66V5p012", // bestpassword
    numberPhone: 46535696332345,
    timestamps: true
  },
];



User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating users from the DB: ${err}`));

