const users = {
  0: {
    firstName: "Jared",
    lastName: "Asch",
    email: "jasch16",
    password: "passw0rd"
  },
  1: {
    firstName: "Steph",
    lastName: "Shi",
    email: "stephshi",
    password: "123456"
  }
};

import { User } from "../../models";
import { UserInputError } from "apollo-server";
import bcrypt from "bcrypt";

const resolvers = {
  Query: {
    allUsers: parent => {
      return User.find({});
    },
    user: (parent, { id }) => {
      return User.findOne(id);
    },
    login: async (parent, { email, password }) => {
      let u = await User.findOne({ email: email });
      if (u == null) {
        throw new UserInputError("Username or Password is incorrect");
      } else {
        let valid = await u.comparePassword(password);
        if (valid) {
          return u;
        } else {
          throw new UserInputError("Username or Password is incorrect");
        }
      }
    }
  },
  Mutation: {
    createUser: async (
      parent,
      { firstName, lastName, email, password },
      context
    ) => {
      let count = await User.countDocuments({ email: email });
      if (count != 0) {
        throw new UserInputError("Account already exists");
      }

      let salt = await bcrypt.genSalt(10);
      let hashed_password = await bcrypt.hash(password, salt);

      let newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashed_password
      });
      newUser.save();
      return newUser;
    }
  }
};

export default resolvers;
