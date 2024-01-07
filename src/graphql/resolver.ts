import { merge } from "lodash";
import { userResolver } from "./resolvers/userResolver";
import { authResolvers } from "./resolvers/authResolver";


export const resolvers = merge(userResolver, authResolvers);