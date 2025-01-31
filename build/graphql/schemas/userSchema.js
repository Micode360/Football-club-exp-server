"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDefs = void 0;
const apollo_server_micro_1 = require("apollo-server-micro");
exports.userDefs = (0, apollo_server_micro_1.gql) `
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    country: CountryQuery
    role:String
    state: String
    city: String
    zipCode: String
    profilePic: ImageQuery
    createdAt: String
  }
  
  input PostInput {
    name: String
  }

  type Query {
    user: User
    users: [User]
    authorizedAccess: Boolean!
  }

  type Mutation {
    UpdateUser(input: UserInput!): Response
    PostUser(input: PostInput!): Response
    DeleteUser(input: Delete!): Response
    TransferRole(input: useId!): Response
    UpdatePassword(input: ChangePassword!): Response
  }

`;
