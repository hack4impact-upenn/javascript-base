import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    user(id: ID!): User
<<<<<<< HEAD
    login(email: String!, password: String!): Boolean
    emailTaken(email: String): Boolean!
    me: User
=======
    login(email: String!, password: String!): String
>>>>>>> bcf4da1... returns access token
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      role: String!
<<<<<<< HEAD
    ): Boolean
    invalidateTokens: Boolean!
=======
    ): String
>>>>>>> bcf4da1... returns access token
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
    count: Int!
  }
`;

export default typeDefs;
