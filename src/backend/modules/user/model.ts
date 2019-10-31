import { prop, getModelForClass } from '@typegoose/typegoose';
import faker from 'faker';
import { randomChoice, titleCase } from '../../utils';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
};
const ROLES = [Role.ADMIN, Role.USER];

export class User {
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

export function generateFakeUsers(count: number = 10): User[] {
  let users: User[] = [];

  // Generate count # of fake users
  for (var i = 0; i < count; i++) {
    const user: User = {
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
    const user: User = {
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