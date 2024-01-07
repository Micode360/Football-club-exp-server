import { User } from "../../models/user";
import base from "../../db/base";
import { response } from "../../utils/response";

base();

export const login = async (parent: any, input: any, context:any) => {
  const { email, password } = input;
  if (!email || !password) {
    return { status: 400, accessToken: "" };
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return { status: 400, accessToken: "User doesn't exist" };
    }

    const isMatch = await user.compareToMatchPasswords(password);

    if (!isMatch) {
      return { status: 400, accessToken: "password does not match" };
    }

    let token = user.getSignedInToken(context);

    return token;
  } catch (error: any) {
    return response(false, 500, error.message);
  }
};
