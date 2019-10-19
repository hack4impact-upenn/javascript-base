const users = {
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
    allUsers: parent => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    }
  }
};

export default resolvers;
