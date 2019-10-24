import { prop, getModelForClass } from '@typegoose/typegoose';
import faker from 'faker';
import { randomChoice, titleCase } from '../../utils';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
};
const ROLES = [Role.ADMIN, Role.USER];

export class IUser {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ enum: ROLES })
  public role?: string;
}

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }

  // Generate a development test user for each role
  for (let role of ROLES) {
    const user: IUser = {
      firstName: titleCase(role),
      lastName: 'Example',
      email: `${role}@gmail.com`,
      password: 'password',
      role,
    }
    users.push(user);
  }

  // console.log(users)
  return users;
}