import express, { Express, Request, Response, Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import base from './db/base'
import CookieParser from 'cookie-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { resolvers } from './graphql/resolver'
import { typeDefs } from './graphql/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import http from 'http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'


// For Context
import jwt from "jsonwebtoken";
import { User } from "./models/user";
import { regenerateAccessToken } from "./utils/utilsFunction";
import { ExpressContextFunctionArgument } from '@apollo/server/express4'
type User = {
  id: string;
};

//DataBase
base()

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000
const httpServer = http.createServer(app)

const MainServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(express.json())
  app.use(CookieParser())

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders:
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    }),
  )

  app.use(express.urlencoded({ extended: true }))
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }: ExpressContextFunctionArgument) => {
        const token = req.headers.authorization || "";
        const bearerToken = token.replace("Bearer ", "");
        const refreshToken = req.cookies.refreshtkn || "";
        let user: User | null = null;
      
        if (!bearerToken) return { user: "unauthorized", status: "public", req, res };
      
        try {
          const decodedToken = jwt.verify(
            bearerToken,
            process.env.JWT_SECRET as string
          ) as {
            id: User | null;
            user: User;
          };
      
          user = decodedToken.id;
      
          return { status: "authorized", user, req, res };
        } catch (error: any) {
          const newAccessToken: any = await regenerateAccessToken(refreshToken);
      
          if (newAccessToken !== "unauthorized") {
            let verifiedAccessToken = jwt.verify(
              newAccessToken,
              process.env.JWT_SECRET as string
            ) as {
              id: User | null;
              user: User;
            };
      
            res.cookie("asstkn", newAccessToken, {
              maxAge: 604800,
              path: "/",
            });
      
            user = verifiedAccessToken.id;
            return { status: "re-authorized", user, req, res };
          } else {
            return { user: "unauthorized", status: "public", req, res };
          }
        }
      },
    }),
  )

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server')
  })

  app.listen(port, () => {
    console.log(`🚀 Express Server is Fired at http://localhost:${port}`)
    console.log(`🚀 Graph Ql Server is Fire at http://localhost:${port}/graphql`)
  })
}

MainServer()
