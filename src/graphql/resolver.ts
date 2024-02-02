import { merge } from 'lodash'
import { userResolver } from './resolvers/userResolver'
import { authResolvers } from './resolvers/authResolver'
import { leagueResolver } from './resolvers/leagueResolver'
import { newsResolver } from './resolvers/newsResolver'

export const resolvers = merge(userResolver, authResolvers, leagueResolver, newsResolver)
