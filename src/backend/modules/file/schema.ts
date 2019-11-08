import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    getFiles(first: Int!, cursor: Int!, sort: String!, desc: Boolean!): [FileInformation]
    getFile(fileId: String!): String
  }
  type Mutation {
    uploadFile(file: Upload!, name: String!, type: String!, permissions: [String]! ) : Boolean
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type FileInformation {
    id: String!
    owner: User
    name: String!
    type: String!
    uploadDate: Date!
    permissions: [String]!
  }

  scalar Date
`;

export default typeDefs;
