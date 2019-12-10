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
    changeName(
      newFirstName: String!
      newLastName: String!
    ): Boolean
    confirmEmail(
      token: String!
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
