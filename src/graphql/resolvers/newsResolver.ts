//Service
import NewsService from "../../services/newsServices";

//Types
import { leagueProps } from "../../utils/types/resolver";


export const newsResolver = {
  Query: {
    news: async (parent:any, args:any, context:any) => NewsService.getNews(parent, args, context),
  },
    Mutation: {
        AddNews: async (parent:any, { input }:{ input: leagueProps }, context:any) => NewsService.addNews(parent, input, context),
        EditNews: async (parent:any, { input }:{ input: leagueProps }, context:any) => NewsService.editNews(parent, input, context),
        DeleteNews: async (parent:any, { input }:{ input: any }, context:any) => NewsService.deleteNews(parent, input, context)
      }
} 


