import express, { Express, Request, Response, Application } from 'express'
import cors, { CorsOptions } from 'cors'
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
import { HomePage } from './utils/template'
type User = {
  id: string;
};

//DataBase
base()

//For env File
dotenv.config()

const app: Application = express()
//app.setMaxListeners(50);
const port = process.env.PORT || 8000
const httpServer = http.createServer(app)

// verify token
const Verify = async (req:any, res:any) => {
  const token = req.headers.authorization || "";
        const bearerToken = token.replace("Bearer ", "");
        const refreshToken = req.cookies.refreshtkn || "";
        const expiryDate = 7 * 24 * 60 * 60 * 1000;
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
              maxAge: expiryDate,
              path: "/",
            });
      
            user = verifiedAccessToken.id;
            return { status: "re-authorized", user, req, res };
          } else {
            return { user: "unauthorized", status: "public", req, res };
          }
        }
}




const MainServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers })

     const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/graphql',
    });
  

    const serverCleanup = useServer({ 
      schema, 
      context:async (ctx, msg, args) => {
        try{
          let user:User | null;
          let token:any = await ctx?.connectionParams?.authToken || "";

          const decodedToken:any = await jwt.verify(
            token,
            process.env.JWT_SECRET as string
          );
      
          user = decodedToken.id;
  
          return { ctx, msg, args, userId: decodedToken }
        }catch(e) {
         // console.log(e, "ERROR FROM USESERVER")
          return  {ctx, msg, args};
        }
    } 
  }, wsServer);

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })


  await server.start()

  app.use(express.json())
  app.use(CookieParser())

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      sameSite: 'none',
      allowedHeaders:
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    }as Partial<CorsOptions>),
  )

  app.use(express.urlencoded({ extended: true }))
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }: ExpressContextFunctionArgument) => {
        return await Verify(req, res);
      },
    }),
  )

  //one route
  app.get('/', (req: Request, res: Response) => {
    res.send(HomePage);
  })

  httpServer.listen(port, () => {
    console.log(`🚀 Express Server is Fired at http://localhost:${port}`)
    console.log(`🚀 Graph Ql Server is Fire at http://localhost:${port}/graphql`)
  })
}

MainServer()
