import { IUser } from "./model";

const users: { [id: string]: IUser } = {
  0: {
    firstName: "Jared",
    lastName: "Asch",
    email: "jasch16",
    password: "passw0rd"
  },
  1: {
    firstName: "Steph",
    lastName: "Shi",
    email: "stephshi",
    password: "123456"
  }
};

const resolvers = {
  Query: {
    allUsers: () => {
      return Object.values(users);
    },
    user: (id: number) => {
      return users[id];
    }
  }
};

export default resolvers;
