import { User } from "../../../models/user";
import base from "../../../db/base";
base();

export const getUser = async (parent: any, args: any, contextValue: any) => {
  if (contextValue.user === "unauthorized") {
    return {}
  }

  const user = await User.findOne({ _id: contextValue.user });
  return user;
};
