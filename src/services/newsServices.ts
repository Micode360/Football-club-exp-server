import { addNews } from "../graphqlFunctions/addFunctions/addNews";
import { updateNewsHeadlines } from "../graphqlFunctions/updateFunctions/updateNewsHeadlines";
import { deleteNews } from "../graphqlFunctions/deleteFunctions/deleteNews";
import { getNews } from "../graphqlFunctions/readFunctions/getNews";
import { getNewsHeadlines } from "../graphqlFunctions/readFunctions/newsHeadlines";
import { updateNews } from "../graphqlFunctions/updateFunctions/updateNews";
import { HandleAccess } from "../graphqlFunctions/updateFunctions/handleAccess";

const NewsService = {
    addNews: async (parent:any, input:any, context:any) => await addNews(parent, input, context), 
    getNews: async (parent:any, args:any, context:any) => await getNews(parent, args, context),
    editNews: async (parent:any, input:any, context:any) => await updateNews(parent, input, context),
    deleteNews: async (parent:any, input:any, context:any) => await deleteNews(parent, input, context),
    HandleAccess: async (parent:any, input:any, context:any) => await HandleAccess(parent, input, context),
    getNewsHeadlines: async (parent:any, args:any, context:any) => await getNewsHeadlines(parent, args, context),
    updateNewsHeadlines: async (parent:any, input:any, context:any) => await updateNewsHeadlines(parent, input, context)
}

export default NewsService;
