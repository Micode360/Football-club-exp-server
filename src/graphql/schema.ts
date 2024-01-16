import { userDefs } from "./schemas/userSchema";
import { authDefs } from "./schemas/authSchema";
import { globalDefs } from "./schemas/globalSchemas";
import { leagueDefs } from "./schemas/leagueSchema";



export const typeDefs = [globalDefs,authDefs,userDefs, leagueDefs];