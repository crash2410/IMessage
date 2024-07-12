import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {makeExecutableSchema} from "@graphql-tools/schema";
import typeDefs from "./graphql/typeDefs";
import resolvers from './graphql/resolvers'

async function main(){

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded"
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

main().catch((err) => console.log(err));

