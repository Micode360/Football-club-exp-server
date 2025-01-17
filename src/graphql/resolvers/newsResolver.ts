//Service
import NewsService from "../../services/newsServices";

//pubsub
import { pubsub } from "../subscriptions/pubsub";

//Types
import { newsProps } from "../../utils/types/resolver";


export const newsResolver = {
  Query: {
    news: async (parent:any, args:any, context:any) => NewsService.getNews(parent, args, context),
    newsHeadlines: async (parent:any, args:any, context:any) => NewsService.getNewsHeadlines(parent, args, context),
  },
    Mutation: {
        AddNews: async (parent:any, { input }:{ input: newsProps }, context:any) => NewsService.addNews(parent, input, context),
        EditNews: async (parent:any, { input }:{ input: newsProps }, context:any) => NewsService.editNews(parent, input, context),
        DeleteNews: async (parent:any, { input }:{ input: any }, context:any) => NewsService.deleteNews(parent, input, context),
        RemoveAuthor:async (parent:any, { input }:{ input: any }, context:any) => NewsService.RemoveAuthor(parent, input, context),
        HandleAccess:async (parent:any, { input }:{ input: any }, context:any) => NewsService.HandleAccess(parent, input, context),
        UpdateNewsHeadlines: async (parent:any, { input }:{ input: any }, context:any) => NewsService.updateNewsHeadlines(parent, input, context),
      },
      Subscription: {
        newsUpdate: {
          subscribe: (ctx:any, msg:any, args:any) => {
            console.log({
              args: args?.userId?.id
            }, "from news update resolver")
            return pubsub.asyncIterator(`NEWS_UPDATE`);
          },
        },
      }
} 


