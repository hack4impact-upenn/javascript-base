import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    user(id: ID!): User
    login(email: String!, password: String!): Boolean
    emailTaken(email: String): Boolean!
    me: User
    attemptSendForgotPasswordEmail(email: String!): Boolean!
    decodeForgotPasswordLink(token: String!): String!
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
    confirmEmail(
      token: String!
    ): Boolean!
    resetPassword(
      userId: String!
      newPassword: String!
    ): Boolean!
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
