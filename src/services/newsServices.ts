import { getNews } from "../graphqlFunctions/readFunctions/getNews";

const NewsService = {
    addNews: async (parent:any, input:any, context:any) => await getNews(parent, input, context), 
    getNews: async (parent:any, args:any, context:any) => [],
    editNews: async (parent:any, input:any, context:any) => ({}),
    deleteNews: async (parent:any, input:any, context:any) => ({}),
}

export default NewsService;
