// Import frameworks
import mongoose, { Document } from 'mongoose';

// Import schemas
import { IUser, UserSchema } from './modules/user/model'
export interface UserDocument extends IUser, Document {};

// Create a database model for each schema
export const User = mongoose.model<UserDocument>("User", UserSchema);