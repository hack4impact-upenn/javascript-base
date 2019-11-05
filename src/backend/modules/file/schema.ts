import { gql } from "apollo-server";

const typeDefs = gql`
  type Mutation {
    uploadFile(file: Upload!) : Boolean
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

export default typeDefs;
