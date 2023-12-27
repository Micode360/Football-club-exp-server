//import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};


export const regenerateAccessToken = (refreshToken: string) => {
  try {
    const verifyToken: any = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as unknown;

    const accessToken = generateAccessToken(verifyToken.id);

    return accessToken;
  } catch (error) {
    return "unauthorized";
  }
};

export const generateCookie = (name: string, value: string) => {
  // cookies().set({
  //   name,
  //   value,
  //   maxAge: 604800,
  //   httpOnly: true,
  //   path: "/",
  // });
};


export const harsh = (value:string) =>
 crypto.createHash('sha256').update(value).digest('hex');;

