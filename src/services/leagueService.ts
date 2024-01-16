import { addLeague } from "../graphqlFunctions/addFunctions/addLeague";
import { deleteLeague } from "../graphqlFunctions/deleteFunctions/deleteLeague";
import { getLeagues } from "../graphqlFunctions/readFunctions/getLeagues";
import { updateLeague } from "../graphqlFunctions/updateFunctions/updateLeague";


const LeagueService = {
    addLeague: async (parent:any, input:any, context:any) => await addLeague(parent, input, context),
    getLeagues: async (parent:any, args:any, context:any) => getLeagues(parent, args, context),
    editLeague: async (parent:any, input:any, context:any) => updateLeague(parent, input, context),
    deleteLeague: async (parent:any, input:any, context:any) => deleteLeague(parent, input, context),
}

export default LeagueService;
