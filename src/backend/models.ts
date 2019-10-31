// Import frameworks
import { getModelForClass } from '@typegoose/typegoose';
// Import schemas
import { IUser } from './modules/user/model'

// Create a database model for each schema
export const User = getModelForClass(IUser);