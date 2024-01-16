import { gql } from "apollo-server-micro";

export const userDefs = gql`
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