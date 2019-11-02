import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    user(id: ID!): User
    login(email: String!, password: String!): String
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      role: String!
    ): User
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
