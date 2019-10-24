const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dummy = require('mongoose-dummy'); 

// Connect to mongodb using mongoose
require("dotenv").config();
mongoose.connect('mongodb://gautamn00:Gunners2015@ds227808.mlab.com:27808/gautam-jsbase-local');

// Extract User model
const models = require("./models");
const User = models.User;

const eraseDatabaseOnSync = true;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", async function() {  
  // We're connected!
  console.log("Connected to database");

  // Delete everything from the database
  if (eraseDatabaseOnSync) {
    await Promise.all([User.deleteMany({})]);
  }

  createFakeUsers();
});

async function createFakeUsers() {
  let randomObject = dummy(User);
  console.log(randomObject);
}

const port = 3000;
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is listening on ${port}`);
});

