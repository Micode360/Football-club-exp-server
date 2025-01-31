"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDefs = void 0;
const apollo_server_micro_1 = require("apollo-server-micro");
exports.authDefs = (0, apollo_server_micro_1.gql) `

  type Token {
    status: Int
    accessToken: String
  }

  input CountryInput {
    imgPath: String
    value: String
  }

  input ProfilePic {
    publicId: String
    imgUrl: String
  }


  input LoginInput {
    email: String!
    password: String!
  }

  input ForgotPassword {
    email: String
    otp: String
    value: String
  }

  type Mutation {
    Register(input: UserInput!): Response
    Login(input: LoginInput!): Token
    ForgotPassword(input: ForgotPassword!): Response
    ChangePassword(input: ChangePassword!): Response
  }
`;
