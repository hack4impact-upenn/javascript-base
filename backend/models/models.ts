// Import frameworks
import mongoose from 'mongoose'

// Import schemas
import { UserSchema } from './user'

// Create a database model for each schema
const User = mongoose.model("User", UserSchema);

// Export schemas
module.exports = {
  User
};
