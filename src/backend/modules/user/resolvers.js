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
import { comparePassword } from "./model";
import jwt from "jsonwebtoken";
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../../../.env") });
const resolvers = {
  Query: {
    allUsers: (parent, args, context) => {
      return User.find({});
    },
    user: (parent, { id }) => {
      return User.findById(id);
    },
    login: async (_, { email, password }, context) => {
      const u = await User.findOne({ email: email });
      if (u == null) {
        throw new UserInputError("Username or Password is incorrect");
      } else {
        const valid = await comparePassword(u, password);

        if (valid) {
          const accessToken = jwt.sign(
            { userId: u.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15min" }
          );

          const refreshToken = jwt.sign(
            { userId: u.id, count: u.count },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
          );

          context.res.cookie("refresh-token", refreshToken);
          context.res.cookie("access-token", accessToken);

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
      { firstName, lastName, email, password, role },
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
        password: hashedPassword,
        role: role,
        count: 0
      });
      newUser.save();

      return newUser;
    }
  }
};

export default resolvers;
