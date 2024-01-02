import { User } from "../../../models/user";
import base from "../../../db/base";
import { Types } from "mongoose";
import { userProperties } from "../../../utils/types/resolver";
import { v2 as cloudinary } from "cloudinary";
import { pubsub } from "../../resolver";

base();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const updateUser = async (parent: any, input: userProperties) => {
  const {
    id,
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    zipCode,
    profilePic,
  }: any = input;

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

    if (user.profilePic.publicId !== profilePic?.publicId) {
      cloudinary.uploader.destroy(user.profilePic.publicId);
    }

    user.set({
      firstName,
      lastName,
      email,
      country: {
        imgPath: country?.imgPath,
        value: country?.value,
      },
      state,
      city,
      zipCode,
      profilePic: {
        publicId: profilePic?.publicId,
        imgUrl: profilePic?.imgUrl,
      },
    });

    await user.save();

  //   pubsub.publish('USER_UPDATED', {
  //     user,
  // })

    return {
      success: true,
      status: 200,
      message: "User updated successfully",
      value: "Updated user data",
    };
  } catch (error: any) {
    throw new Error("Error updating user: " + error.message);
  }
};