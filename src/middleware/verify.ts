import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
import { User } from "../models/user";
import { regenerateAccessToken } from "../utils/utilsFunction";


type User = {
  id: string;
};

export const verifyAuth = async (req: any, res: any) => {
  const token = req.headers.get("authorization") || "";
  const bearerToken = token.replace("Bearer ", "");
  const refreshToken = ""; //cookies()?.get("refreshtkn")?.value || "";
  let user: User | null = null;

  if (!bearerToken) return {  user: "unauthorized", status: "public", req, res };

  try {
    const decodedToken = jwt.verify(
      bearerToken,
      process.env.JWT_SECRET as string
    ) as {
      id: User | null;
      user: User;
    };

    user = decodedToken.id;

    return { status: "authorized", user, req, res };
  } catch (error: any) {
    const newAccessToken: any = await regenerateAccessToken(refreshToken);

    if (newAccessToken !== "unauthorized") {
      let verifiedAccessToken = jwt.verify(
        newAccessToken,
        process.env.JWT_SECRET as string
      ) as {
        id: User | null;
        user: User;
      };

      // cookies().set({
      //   name: "asstkn",
      //   value: newAccessToken,
      //   maxAge: 604800,
      //   path: "/",
      // });

      user = verifiedAccessToken.id;
      return { status: "re-authorized", user, req, res };
    } else {
      return { user: "unauthorized", status: "public", req, res };
    }
  }
};
