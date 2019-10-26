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
import config from "../../../../config/default.json";
import { UserInputError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    allUsers: parent => {
      return User.find({});
    },
    user: (parent, { id }) => {
      return User.findOne(id);
    },
    login: async (parent, { email, password }) => {
      const u = await User.findOne({ email: email });
      if (u == null) {
        throw new UserInputError("Username or Password is incorrect");
      } else {
        const valid = await u.comparePassword(password);
        if (valid) {
          const payload = {
            user: {
              id: u.id
            }
          };
          return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
        } else {
          throw new UserInputError("Username or Password is incorrect");
        }
      }
    }
  },
  Mutation: {
    createUser: async (
      parent,
      { firstName, lastName, email, password, role },
      context
    ) => {
      const count = await User.countDocuments({ email: email });
      if (count != 0) {
        throw new UserInputError("Account already exists");
      }

      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      const payload = {
        user: {
          id: newUser.id
        }
      };

      return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
    }
  }
};

export default resolvers;
