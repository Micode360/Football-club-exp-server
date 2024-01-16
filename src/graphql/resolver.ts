import { merge } from "lodash";
import { userResolver } from "./resolvers/userResolver";
import { authResolvers } from "./resolvers/authResolver";
import { leagueResolver } from "./resolvers/leagueResolver";


export const resolvers = merge(userResolver, authResolvers, leagueResolver);