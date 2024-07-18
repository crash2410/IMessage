import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {makeExecutableSchema} from "@graphql-tools/schema";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import typeDefs from "./graphql/typeDefs";
import resolvers from './graphql/resolvers'
// @ts-ignore
import express from 'express';
// @ts-ignore
import http from 'http';
// @ts-ignore
import cors from 'cors';
import { json } from "body-parser";
import {expressMiddleware} from "@apollo/server/express4";
import * as dotenv from "dotenv"
import {getSession} from "next-auth/react";
import {getServerSession} from "./util/getServerSession";
import {GraphQLContext} from "./util/types";
import { PrismaClient } from "@prisma/client";
import {connectToDatabase, getDb} from "./mongodb/db";

async function main() {
    dotenv.config();

    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer})
        ]
    });

    await connectToDatabase();
    await server.start();

    const corsOptions = {
        origin: process.env.CLIENT_ORIGIN,
        credentials: true
    }

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(corsOptions),
        json(),
        expressMiddleware(server, {
            context: async ({req, res}): Promise<GraphQLContext>=> {
                if (req.headers.cookie) {
                   let session = await getServerSession(req.headers.cookie)
                    return {session: session , mongodb: getDb()}
                } else {
                    return {
                        session: null,
                        mongodb: getDb()
                    }
                }
            },
        }),
    );

    await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);
}

main().catch((err) => console.log(err));
