import { UserInputError } from "apollo-server";
import { sendConfirmationEmail, attemptConfirmation } from "../../../services/confirm-email";
import { config } from "dotenv";
import path from "path";
import { createTokens } from "../../middleware/auth";
import { User } from "../../models";
import { comparePassword } from "./model";

config({ path: path.resolve(__dirname, "../../../.env") });
const resolvers = {
  Query: {
    emailTaken: async (_, { email }) => {
      return 0 == (await User.countDocuments({ email: email }));
    },
    allUsers: () => {
      return User.find({});
    },
    user: (parent, { id }) => {
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
      { firstName, lastName, email, password, role }    ) => {
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
      newUser.save();
      sendConfirmationEmail(newUser);
      return newUser;
    },
    changeName: async (
      parent,
      { newFirstName, newLastName }, 
      context
    ) => {
      const currUser = await User.findById(context.req.userId);

      if (currUser == null) {
        throw new UserInputError("No user found");
      } else {
        currUser.firstName = newFirstName;
        currUser.lastName = newLastName;
        currUser.save();
        return true;
      }
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
    },
    confirmEmail: async (parent, { token }, context) => {
      attemptConfirmation(token);
      return true;
    },
    changePassword: async (
      parent,
      { oldPassword, newPassword }, 
      context
    ) => {
      const currUser = await User.findById(context.req.userId);

      if (currUser == null) {
        throw new UserInputError("No user found");
      } else {
        const valid = await comparePassword(currUser, oldPassword);
        
        if (!valid) {
          throw new UserInputError("Current password is incorrect");
        } else {
          currUser.password = newPassword;
          currUser.save();
          return true;
        }
      }
    }
  }
};

export default resolvers;
