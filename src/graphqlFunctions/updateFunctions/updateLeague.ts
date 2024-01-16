import { User } from "../../models/user";
import { League } from "../../models/leagues";
import base from "../../db/base";
import { Types } from "mongoose";
import { leagueProps } from "../../utils/types/resolver";
import { v2 as cloudinary } from "cloudinary";
import { pubsub } from "../../graphql/mainResolver";

base();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const updateLeague = async (parent: any, input:leagueProps, context:any) => {
  if (context.user === "unauthorized") {
    return {}
  }
  
  const {
    id,
    leagueId,
    name,
    logo,
    country,
    description,
    website,
    socials,
    backgroundGradient
  } = input;

  console.log({
    id,
    name,
    logo,
    country,
    description,
    website,
    socials,
    backgroundGradient
  }, "edit league");

  try {
    const user = await User.findOne({ _id: new Types.ObjectId(id) });

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
        value: null,
      };
    }

    if (user.role !== "Super Admin") {
      return {
        success: false,
        status: 403,
        message: "You are not authorized to update leagues"
      };
    } else {
      const league: any = await League.findOne({ _id: leagueId });
    
      const leagueUpdate: any = {
        id,
        name,
        logo: {
          publicId: logo?.publicId,
          imgUrl: logo?.imgUrl,
        },
        country: {
          imgPath: country?.imgPath,
          value: country?.value,
        },
        description,
        website,
        socials,
        backgroundGradient
      };
    
      league.set(leagueUpdate);
    
      await league.save();
    }
    
    
    return {
      success: true,
      status: 200,
      message: "League updated successfully",
    };
  } catch (error: any) {
    throw new Error("Error updating user: " + error.message);
  }
};