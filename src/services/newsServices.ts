import { addNews } from "../graphqlFunctions/addFunctions/addNews";
import { deleteNews } from "../graphqlFunctions/deleteFunctions/deleteNews";
import { getNews } from "../graphqlFunctions/readFunctions/getNews";
import { updateNews } from "../graphqlFunctions/updateFunctions/updateNews";

const NewsService = {
    addNews: async (parent:any, input:any, context:any) => await addNews(parent, input, context), 
    getNews: async (parent:any, args:any, context:any) => await getNews(parent, args, context),
    editNews: async (parent:any, input:any, context:any) => await updateNews(parent, input, context),
    deleteNews: async (parent:any, input:any, context:any) => await deleteNews(parent, input, context),
}

export default NewsService;
