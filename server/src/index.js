const express = require("express");
const app = express();

// Connect to mongodb using mongoose
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// Extract User model
const models = require("./models/models");
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

  // Seed the database
  createFakeUsers();
});

async function createFakeUsers() {
  let annieUser = new User({
    firstName: "annie",
    lastName: "su",
    email: "annie@gmail.com",
    password: "hello"
  });
  await annieUser.save();
  console.log("Added annie");

  let gautamUser = new User({
    firstName: "gautam",
    lastName: "narayan",
    email: "gautam@gmail.com",
    password: "goodbye"
  });
  await gautamUser.save();
  console.log("Added gautaum");

  let katieUser = new User({
    firstName: "katie",
    lastName: "jiang",
    email: "katie@gmail.com",
    password: "helloooooo"
  });
  await katieUser.save();
  console.log("Added katie");
}

const port = 3000;
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is listening on ${port}`);
});
