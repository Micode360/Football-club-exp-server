//Service
import LeagueService from "../../services/leagueService";

//Types
import { leagueProps } from "../../utils/types/resolver";


export const leagueResolver = {
  Query: {
    leagues: async (parent:any, args:any, context:any) => LeagueService.getLeagues(parent, args, context),
  },
    Mutation: {
        AddLeague: async (parent:any, { input }:{ input: leagueProps }, context:any) => LeagueService.addLeague(parent, input, context),
        EditLeague: async (parent:any, { input }:{ input: leagueProps }, context:any) => LeagueService.editLeague(parent, input, context),
        DeleteLeague: async (parent:any, { input }:{ input: any }, context:any) => LeagueService.deleteLeague(parent, input, context)
      }
} 


