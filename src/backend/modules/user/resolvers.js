import { UserInputError } from "apollo-server";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import path from "path";
import { createTokens } from "../../middleware/auth";
import { User } from "../../models";
import { comparePassword, Role } from "./model";

import { AuthenticationError } from "apollo-server";

config({ path: path.resolve(__dirname, "../../../.env") });
const resolvers = {
  Query: {
    userCount: async (parent, {}, context) => {
      return await User.countDocuments({})
    },

    emailTaken: async (_, { email }, context) => {
      return 0 == (await User.countDocuments({ email: email }));
    },

    allUsers: (parent, args, context) => {
      return User.find({});
    },

    getUsers: async (parent, { page, pageSize, search, orderBy, orderDirection }, context) => {
      if(!context.req.userId){
        throw new AuthenticationError("You must be logged in to view users");
      }
      if(context.req.role != Role.ADMIN){
        console.log(context.req.role)
        throw new AuthenticationError("You must be an admin to view users");
      }
      return (await User.find({ $or: [
        { firstName: {$regex: new RegExp(search), $options: 'i'}},
        { lastName: {$regex: new RegExp(search), $options: 'i'}},
        { email: {$regex: new RegExp(search), $options: 'i'}},
      ]}).collation({locale: "en" }).sort({
        [orderBy]: orderDirection == "asc" ? 1 : -1
      })).slice(page * pageSize, (page + 1) * pageSize);
    },

    user: (parent, { id }, context) => {
      return User.findById(id);
    },

    me: (_, __, context) => {
      if (!context.req.userId) {
        return;
      }
      return User.findById(context.req.userId);
    },

    login: async (_, { email, password }, context) => {
      const u = await User.findOne({ email: email });
      if (u == null) {
        throw new UserInputError("Username or Password is incorrect");
      } else {
        const valid = await comparePassword(u, password);
        if (valid) {
          // User is succesfully validated
          const { refreshToken, accessToken } = createTokens(u);

          context.res.cookie("refresh-token", refreshToken, {
            maxAge: 1000 * 3600 * 24 * 7,
            httpOnly: true
          });
          context.res.cookie("access-token", accessToken, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true
          });
          return true;
        } else {
          throw new UserInputError("Username or Password is incorrect");
        }
      }
    }
  },
  
  Mutation: {
    // TODO : Once cookies working, make sure added user has user role if cookie is not set or user
    // Only admins should be able to add other admins
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

      return true;
    },
    invalidateTokens: async (_, __, context) => {
      if (!context.req.userId) {
        return false;
      }

      const user = await User.findById(context.req.userId);
      if (!user) {
        return false;
      }
      user.count += 1;
      await user.save();

      context.res.clearCookie("access-token");
      context.res.clearCookie("refresh-token");

      return true;
    }
  }
};

export default resolvers;
