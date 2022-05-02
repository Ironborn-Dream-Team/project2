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
    password: required,
    numberPhone: 0142464364364,
    timestamps: true
  },
  {
    username: "Bob",
    email: "bob@gmail.com",
    password: required,
    numberPhone: 5356765323456,
    timestamps: true
  },
  {
    username: "Claire",
    email: "claire@gmail.com",
    password: required,
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

