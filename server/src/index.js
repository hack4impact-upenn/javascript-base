//import { User, IUser, UserSchema } from "./models/user.model.ts";
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongodb_url = process.env.MONGODB_URI;
console.log("mongodb url = " + mongodb_url);
mongoose.connect("" + mongodb_url);
// let myUser = new User({
//   name: "annie",
//   email: "annie@gmail.com"
// });
// Users.create(myUser, (err, doc) => {
//   if (err) {
//     console.log("error");
//   }
//   console.log(doc._id);
//   console.log(doc.name);
// });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("Connected to database");
});

console.log("Hello from the server");
const port = 3000;
// app.get('/', (req, res) => {
//   res.send('The sedulous hyena ate the antelope!');
// });
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`server is listening on ${port}`);
});
