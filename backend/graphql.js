import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";

import userSchema from "./modules/user/schema";
import userResolvers from "./modules/user/resolvers";

const schemas = [userSchema];
const resolvers = [userResolvers];

module.exports = {
  schema: mergeTypes(schemas, { all: true }),
  resolvers: mergeResolvers(resolvers)
};
