import { userDefs } from './schemas/userSchema'
import { authDefs } from './schemas/authSchema'
import { globalDefs } from './schemas/globalSchemas'
import { leagueDefs } from './schemas/leagueSchema'
import { newsDefs } from './schemas/newsSchema'
import { notificationDefs } from './schemas/notificationSchema'

export const typeDefs = [globalDefs, authDefs, userDefs, leagueDefs, newsDefs, notificationDefs]
