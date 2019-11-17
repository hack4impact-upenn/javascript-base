import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    allUsers: [User!]
    getUsers(page: Int, pageSize: Int, search: String!, orderBy: String!, orderDirection: String!): [User!]
    user(id: ID!): User
    userCount: Int
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
    ): Boolean
    invalidateTokens: Boolean!
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
