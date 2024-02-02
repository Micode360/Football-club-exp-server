import { gql } from "apollo-server-micro";

export const newsDefs = gql`
type News {
  id: String
  title: String
  coverImage: ImageQuery
  description: String
  author: String
  authorIds: [User] 
  league: String
  categories: [String]
  content: String
  createdAt: String
}

  input NewsInput {
    id: String
    userId: String
    authorIds: [String] 
    title: String!
    coverImage: ProfilePic
    description: String
    author: String
    league: String!
    categories: [String]! 
    content: String
  }

  type Query {
    news: [News]
  }

  type Mutation {
    AddNews(input: NewsInput!): Response
    EditNews(input: NewsInput!): Response
    DeleteNews(input: Delete!): Response
  }

`;
