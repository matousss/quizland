import mongoClient from "../../lib/mongodb";
import {getResolvers, typeDefs} from "../graphql";
import {ApolloServer} from "@apollo/server";
import {IncomingMessage, ServerResponse} from "http";
import {Context} from "./context";

const getServer = async () => {
    console.log('Connecting to mongo...');
    let connection;
    try {
        connection = await mongoClient.connect();
    } catch (e) {
        console.error('Could not connect to mongo', e);
        process.exit(1);
    }
    const resolvers = getResolvers(connection);
    const apolloServer = new ApolloServer<Context>({typeDefs: typeDefs, resolvers: resolvers});
    // noinspection JSUnusedGlobalSymbols
    return {
        server: apolloServer,
        options: {
            context: async (req: IncomingMessage, res: ServerResponse) => await resolveContext(connection, req, res),
            cors: {
                origin: '*',
                introspection: true,
                credentials: true
            }
        }
    }
}
export default getServer;