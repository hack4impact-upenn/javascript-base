const express = require("express");
const app = express();

// Connect to mongodb using mongoose
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// Extract database models
const models = require("./models/models");
const User = models.User;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // We're connected!
  console.log("Connected to database");

  // Seed the database
  createFakeUsers();
});

function createFakeUsers() {
  let myUser = new User({
    firstName: "annie",
    lastName: "su",
    email: "annie@gmail.com",
    password: "hello"
  });
  User.create(myUser, (err, doc) => {
    if (err) {
      console.log("error");
    }
    console.log(doc._id);
    console.log(doc.name);
  });
}
const port = 3000;
// app.get('/', (req, res) => {
//   res.send('The sedulous hyena ate the antelope!');
// });
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is listening on ${port}`);
});
