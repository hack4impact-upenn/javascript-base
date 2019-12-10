import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    user(id: ID!): User
    login(email: String!, password: String!): Boolean
    emailTaken(email: String): Boolean!
    me: User
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      role: String!
    ): User
    invalidateTokens: Boolean!
<<<<<<< HEAD
    confirmEmail(
      token: String!
    ): Boolean
=======
>>>>>>> be3eced8f3b249dfd169d99ccc4e72a0da432a17
    changePassword(
      oldPassword: String!
      newPassword: String!
    ): Boolean
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
    isVerified: Boolean!
    count: Int!
  }
`;

export default typeDefs;
