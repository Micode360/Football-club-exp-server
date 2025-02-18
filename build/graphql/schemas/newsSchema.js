"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsDefs = void 0;
const apollo_server_micro_1 = require("apollo-server-micro");
exports.newsDefs = (0, apollo_server_micro_1.gql) `
  type News {
    id: String
    sn: ID
    title: String
    coverImage: ImageQuery
    description: String
    status:String
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
      title: String
      coverImage: ProfilePic
      description: String
      status:String
      author: String
      league: String
      categories: [String] 
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
      news(limit:Int): [News]
      newsHeadlines: NewsHeadlineResult
    }

    
    type Mutation {
      AddNews(input: NewsInput!): Response
      EditNews(input: NewsInput!): Response
      DeleteNews(input: Delete!): Response
      RemoveAuthor(input: Delete!): Response
      HandleAccess(input: HandleAccess!): Response
      UpdateNewsHeadlines(input: NewsHeadline!): Response
    }

    type Subscription {
      newsUpdate: News
    }
`;
