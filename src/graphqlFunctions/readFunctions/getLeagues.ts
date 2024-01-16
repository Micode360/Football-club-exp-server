import { League } from "../../models/leagues";
import base from "../../db/base";
base();

export const getLeagues = async (parent: any, args: any, contextValue: any) => {
  if (contextValue.user === "unauthorized") {
    return []
  }

  const leagues = await League.find();
  return leagues;
};
