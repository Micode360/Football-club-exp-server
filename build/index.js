"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const base_1 = __importDefault(require("./db/base"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const resolver_1 = require("./graphql/resolver");
const schema_1 = require("./graphql/schema");
const schema_2 = require("@graphql-tools/schema");
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
// For Context
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utilsFunction_1 = require("./utils/utilsFunction");
const template_1 = require("./utils/template");
//DataBase
(0, base_1.default)();
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10) || 8000;
const httpServer = http_1.default.createServer(app);
// verify token
const Verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || "";
    const bearerToken = token.replace("Bearer ", "");
    const refreshToken = req.cookies.refreshtkn || "";
    const expiryDate = 7 * 24 * 60 * 60 * 1000;
    let user = null;
    if (!bearerToken)
        return { user: "unauthorized", status: "public", req, res };
    try {
        const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.JWT_SECRET);
        user = decodedToken.id;
        return { status: "authorized", user, req, res };
    }
    catch (error) {
        const newAccessToken = yield (0, utilsFunction_1.regenerateAccessToken)(refreshToken);
        if (newAccessToken !== "unauthorized") {
            let verifiedAccessToken = jsonwebtoken_1.default.verify(newAccessToken, process.env.JWT_SECRET);
            res.cookie("asstkn", newAccessToken, {
                maxAge: expiryDate,
                path: "/",
            });
            user = verifiedAccessToken.id;
            return { status: "re-authorized", user, req, res };
        }
        else {
            return { user: "unauthorized", status: "public", req, res };
        }
    }
});
const MainServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = (0, schema_2.makeExecutableSchema)({ typeDefs: schema_1.typeDefs, resolvers: resolver_1.resolvers });
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    const serverCleanup = (0, ws_2.useServer)({
        schema,
        context: (ctx, msg, args) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                let user;
                let token = (yield ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.connectionParams) === null || _a === void 0 ? void 0 : _a.authToken)) || "";
                const decodedToken = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                user = decodedToken.id;
                return { ctx, msg, args, userId: decodedToken };
            }
            catch (e) {
                //                 return { ctx, msg, args };
            }
        })
    }, wsServer);
    const server = new server_1.ApolloServer({
        schema,
        introspection: true,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield serverCleanup.dispose();
                                });
                            },
                        };
                    });
                },
            },
        ],
    });
    yield server.start();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        sameSite: 'none',
        allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Verify(req, res);
        }),
    }));
    //one route
    app.get('/', (req, res) => {
        res.send(template_1.HomePage);
    });
    // '0.0.0.0' is used to make the server accessible from outside the network
    httpServer.listen(port, '0.0.0.0', () => {
                    });
});
MainServer();
