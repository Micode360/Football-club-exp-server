"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalDefs = void 0;
const apollo_server_micro_1 = require("apollo-server-micro");
exports.globalDefs = (0, apollo_server_micro_1.gql) `
  type Response {
    success: Boolean!
    status: Int
    message: String
    value: String
  }

  type Error {
    message: String
  }

  type CountryQuery {
    imgPath: String
    value: String
  }

  type ImageQuery {
    publicId: String
    imgUrl: String
  }

  type Subscription {
    user: User
    response: Response
  }

  input useId {
    id:String
    userId: String
  }

  input multipleDeleteIdProps {
    id: String
    imgId: String
  }

  input Delete  {
    authorId: String
    type: String
    thisId: String
    imgId: String
    headLineId: String
    arrIds: [multipleDeleteIdProps]
  }

  input UserInput {
    id: String
    firstName: String
    lastName: String
    email: String
    country: CountryInput
    state: String
    city: String
    zipCode: String
    profilePic: ProfilePic
    password: String
  }

  input CountryInput {
    imgPath: String
    value: String
  }

  input ProfilePic {
    publicId: String
    imgUrl: String
  }

  input ChangePassword {
    id: String!
    password: String!
    currentPassword: String
  }
`;
