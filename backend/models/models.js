// Import frameworks
const mongoose = require("mongoose");

// Import schemas
const UserSchema = require("./user");

// Create a database model for each schema
const User = mongoose.model("User", UserSchema);

// Export schemas
module.exports = {
  User
};
