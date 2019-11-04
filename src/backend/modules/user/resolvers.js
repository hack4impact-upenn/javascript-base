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
import { sendConfirmationEmail } from "../../../services/confirm-email";
import bcrypt from "bcrypt";
    
const resolvers = {
  Query: {
    allUsers: parent => {
      return User.find({});
    },
    user: (parent, { id }) => {
      return User.findById(id);
    },
    login: async (parent, { email, password }) => {
      const u = await User.findOne({ email: email });
      if (u == null) {
        throw new UserInputError("Username or Password is incorrect");
      } else {
        const valid = await u.comparePassword(password);
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
      const count = await User.countDocuments({ email: email });
      if (count != 0) {
        throw new UserInputError("Account already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
      });
      newUser.save();
      sendConfirmationEmail(newUser);
      console.log('executed sendConfirmationEmail in createUser');
      return newUser;
    }
  }
};

export default resolvers;
