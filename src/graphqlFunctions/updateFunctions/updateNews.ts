import { User } from "../../models/user";
import { News } from "../../models/news";
import base from "../../db/base";
import { Types } from "mongoose";
import { newsProps } from "../../utils/types/resolver";
import { v2 as cloudinary } from "cloudinary";
import { pubsub } from "../../graphql/mainResolver";

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
    league,
    categories, 
    content
  } = input

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

    console.log(news.authorIds.includes(user._id), "author Id?")

    if (user.role !== "Super Admin" || !news.authorIds.includes(user._id)) {
      return {
        success: false,
        status: 403,
        message: "You are not authorized to update news"
      };
    } else {
    
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
    
      news.set(newsUpdate);
    
      await news.save();
    }
    
    
    return {
      success: true,
      status: 200,
      message: "News updated successfully",
    };
  } catch (error: any) {
    console.log(error,"error from news update server");
    throw new Error("Error updating user: " + error.message);
  }
};