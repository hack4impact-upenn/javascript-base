import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    getFiles(page: Int!, pageSize: Int!, search: String!, orderBy: String!, orderDirection: String!): [FileInformation]
    getFile(fileId: String!): String
    getFileCount: Int!
  }
  type Mutation {
    uploadFile(file: Upload!, name: String!, type: String! ) : Boolean
    deleteFile(fileId: String!) : Boolean
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
    type: String
    uploadDate: Date!
  }

  scalar Date
`;

export default typeDefs;
