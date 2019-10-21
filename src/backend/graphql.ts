import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";

import userSchema from "./modules/user/schema";
import userResolvers from "./modules/user/resolvers";

export const schemas = mergeTypes([userSchema], { all: true });
export const resolvers = mergeResolvers([userResolvers]);