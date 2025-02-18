import { User } from "../../models/user";
import { News } from "../../models/news";
import base from "../../db/base";
import { Types } from "mongoose";
import { newsProps } from "../../utils/types/resolver";
import { v2 as cloudinary } from "cloudinary";
import { pubsub } from '../../graphql/subscriptions/pubsub';

base();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const updateNews = async (parent: any, input:newsProps, context:any) => {
  if (context.user === "unauthorized") {
    return {}
  }
  
  const {
    id,
    authorIds,
    userId,
    title,
    coverImage,
    description,
    author,
    status,
    league,
    categories, 
    content
  } = input

    
  const newsUpdate: any ={
    authorIds,
    userId,
    title,
    coverImage,
    description,
    author,
    league,
    categories, 
    content
  };

  try {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) });
    const news = await News.findOne({ _id: id });

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
        value: null,
      };
    }

    if (
      (user.role !== 'Super Admin' && news.authorIds.includes(user?._id)) ||
        user.role === 'Super Admin'
    ){
      if(status === "to_be_published"){
        news.status = "published";
        await news.save();

        return {
          success: true,
          status: 200,
          message: "News published successfully",
        };
      }
      news.set({status});
      await news.save();

      const channel = `NEWS_UPDATE`;
      pubsub.publish(channel, { newsUpdate: {...newsUpdate, id, createdAt: news.createdAt } });
    } else {
      return {
        success: false,
        status: 403,
        message: "You are not authorized to update news"
      };
    }

    return {
      success: true,
      status: 200,
      message: "News updated successfully",
    };
  } catch (error: any) {
    throw new Error("Error updating user: " + error.message);
  }
};