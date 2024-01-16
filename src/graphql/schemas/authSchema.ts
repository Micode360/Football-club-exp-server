import { gql } from "apollo-server-micro";

export const authDefs = gql`

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