import { gql } from "apollo-server-micro";

export const newsDefs = gql`
  type News {
    id: String
    sn: ID
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

  type NewsHeadlineResult {
    id: String
    headlines: [News]
  }


    input NewsInput {
      id: String
      sn: ID
      userId: String
      authorIds: [String] 
      title: String!
      coverImage: ProfilePic
      description: String
      author: String
      league: String!
      categories: [String]! 
      content: String
      createdAt: String
    }

    input NewsHeadline {
      type: String
      userId: String
      headlineId: String
      headlines: [NewsInput]
    }

    input HandleAccess{
      type: String
      id: String
      userId: String
      authorId: String
    }

    type Query {
      news: [News]
      newsHeadlines: NewsHeadlineResult
    }

    
    type Mutation {
      AddNews(input: NewsInput!): Response
      EditNews(input: NewsInput!): Response
      DeleteNews(input: Delete!): Response
      HandleAccess(input: HandleAccess!): Response
      UpdateNewsHeadlines(input: NewsHeadline!): Response
    }

`;
