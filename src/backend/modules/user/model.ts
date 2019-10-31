import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose';
import faker from 'faker';
import { randomChoice, titleCase } from '../../utils';
import bcrypt from "bcrypt"

export enum Role {
  ADMIN = "admin",
  USER = "user"
}
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

  @prop({ required: true })
  public count!: number;
}

export function generateFakeUsers(count=10): IUser[] {
  const users: IUser[] = [];

  // Generate count # of fake users
  for (let i = 0; i < count; i++) {
    const user: IUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "password",
      role: randomChoice(ROLES),
      count: 0
    };
    users.push(user);
  }

  // Generate a development test user for each role
  for (const role of ROLES) {
    const user: IUser = {
      firstName: titleCase(role),
      lastName: "Example",
      email: `${role}@gmail.com`,
      password: "password",
      role,
      count: 0
    };
    users.push(user);
  }

  // console.log(users)
  return users;
}

<<<<<<< HEAD
export async function comparePassword(
  user: DocumentType<IUser>,
  password: string
) {
  return await bcrypt.compare(password, user.password);
}
=======
export async function comparePassword (user: DocumentType<IUser>, password : string){
  return await bcrypt.compare(password, user.password); 
}
>>>>>>> a67aed6... integrated old auth functions into new models
