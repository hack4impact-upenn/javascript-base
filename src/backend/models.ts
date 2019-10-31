// Import frameworks
import { getModelForClass } from '@typegoose/typegoose';
// Import schemas
import { User } from './modules/user/model'

// Create a database model for each schema
export const UserModel = getModelForClass(User);