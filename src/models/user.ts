//import { cookies } from 'next/headers';
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../utils/utilsFunction";


const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name required"],
    },
    email: {
      type: String,
      required: [true, "Email Address required"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    role: {
      type: String,
      required: false,
    },
    country: {
      imgPath: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      }
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: false,
    },
    profilePic: {
      publicId: {
        type: String,
        required: false,
      },
      imgUrl: {
        type: String,
        required: false,
      }
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minLength: 6,
      select: false,
    },
    verifyUser: Boolean,
    verifyUserToken: String,
    otp: String,
    confirmPassword: Boolean,
    confirmPasswordToken: String
  },
  {
    timestamps: true,
  }
);


UserSchema.pre('save', async function (this: any, next: any) {
  if (!this.isModified('password')) next()

  const salt = await bcrypt.genSalt(15)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.compareToMatchPasswords = async function (password: any) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedInToken = async function (context:any) {
  const accessToken = await generateAccessToken(this.id);
  const refreshToken = await generateRefreshToken(this.id);
  const expiryDate = 7 * 24 * 60 * 60 * 1000;

    context.res.cookie("refreshtkn", refreshToken, {
      httpOnly: true,
      maxAge: expiryDate,
      path: "/",
    });

  const status = 200; 

  return  { status, accessToken }
}


export const User = mongoose.models.User || mongoose.model("User", UserSchema);