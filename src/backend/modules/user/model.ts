import { Schema } from 'mongoose';
import faker from 'faker';
import { randomChoice, titleCase } from '../../utils';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
};
const ROLES = [Role.ADMIN, Role.USER];

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
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
    enum: ROLES,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  }
});

export function generateFakeUsers(count: number = 10): IUser[] {
  let users: IUser[] = [];

  // Generate count # of fake users
  for (var i = 0; i < count; i++) {
    const user: IUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password',
      role: randomChoice(ROLES),
    }
    users.push(user);
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