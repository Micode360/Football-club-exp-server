import { News } from "../../models/news";
import base from "../../db/base";
base();

export const getNews = async (parent: any, args: any, contextValue: any) => {
  const { limit } = args;

  if (contextValue.user === "unauthorized") {
    return [];
  }

  // If no limit is provided, return all news (first load scenario)
  if (!limit) {
    const allNews = await News.find()
      .populate('authorIds', 'firstName lastName profilePic');
    return allNews;
  }

  // If limit is provided, return the latest 'limit' number of news items
  const limitedNews = await News.find()
    .populate('authorIds', 'firstName lastName profilePic')
    .sort({ createdAt: -1 })  // Sort by latest created
    .limit(limit);

  return limitedNews;
};
