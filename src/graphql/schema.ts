import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Response {
    success: Boolean!
    status: Int
    message: String
    value: String
  }

  type Error {
    message: String
  }

  type Token {
    status: Int
    accessToken: String
  }
  type CountryQuery {
    imgPath: String
    value: String
  }

  type ProfilePicQuery {
    publicId: String
    imgUrl: String
  }

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    country: CountryQuery
    state: String
    city: String
    zipCode: String
    profilePic: ProfilePicQuery
  }

  input CountryInput {
    imgPath: String
    value: String
  }

  input ProfilePic {
    publicId: String
    imgUrl: String
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

  input LoginInput {
    email: String!
    password: String!
  }

  input ForgotPassword {
    email: String
    otp: String
    value: String
  }

  input ChangePassword {
    id: String!
    password: String!
  }

  
  input PostInput {
    name: String
  }

  type UserType {
    name: String
  }
  
  type Query {
    user: User
    authorizedAccess: Boolean!
  }

  type Mutation {
    Register(input: UserInput!): Response
    Login(input: LoginInput!): Token
    ForgotPassword(input: ForgotPassword!): Response
    ChangePassword(input: ChangePassword!): Response
    UpdateUser(input: UserInput!): Response
    PostUser(input: PostInput!): Response
  }

  type Subscription {
    user: UserType
  }
`;