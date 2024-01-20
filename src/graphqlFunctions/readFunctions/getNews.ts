import { News } from "../../models/news";
import base from "../../db/base";
base();

export const getNews = async (parent: any, args: any, contextValue: any) => {
  if (contextValue.user === "unauthorized") {
    return []
  }

  const news = await News.find();
  return news;
};
