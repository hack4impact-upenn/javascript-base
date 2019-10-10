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

const resolvers = {
  Query: {
    allUsers: parent => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    login: async (parent, { email, password }) => {
      let u = await User.findOne({ email: email });
      console.log(u);
      if (u == null) {
        throw new UserInputError("Username or Password is incorrect");
      } else {
        if (u.comparePassword(password)) {
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
      let newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      newUser.save();
      return newUser;
    }
  }
};

export default resolvers;
