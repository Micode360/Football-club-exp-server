import { User } from "../../../models/user";
import base from "../../../db/base";
base();

export const getUsers = async (parent: any, args: any, contextValue: any) => {
  if (contextValue.user === "unauthorized") {
    return []
  }

  const users = await User.find();
  return users;
};
