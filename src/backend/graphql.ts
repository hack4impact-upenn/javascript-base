import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";

import userSchema from "./modules/user/schema";
import userResolvers from "./modules/user/resolvers";

import fileSchema from "./modules/file/schema";
import fileResolvers from "./modules/file/resolvers";

export const schemas = mergeTypes([userSchema, fileSchema], { all: true });
export const resolvers = mergeResolvers([userResolvers, fileResolvers]);