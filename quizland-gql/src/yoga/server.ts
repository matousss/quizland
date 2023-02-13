import { createYoga, createSchema } from 'graphql-yoga'
import mongoClient from "../../lib/mongodb";
import {getResolvers, typeDefs} from "../graphql";
import {Context, resolveContext} from "../graphql/context";

export const config = {
    api: {
        bodyParser: false
    }
}






async function getServer<TServerContext>(endpoint="/graphql") {
    console.log('Connecting to mongo...');
    let connection;
    try {
        connection = await mongoClient.connect();
    } catch (e) {
        console.error('Could not connect to mongo', e);
        process.exit(1);
    }
    console.log('Client connected to mongo')

    const schema = createSchema({
        typeDefs: typeDefs,
        resolvers: getResolvers(connection)
    })

    return createYoga<TServerContext, Context>({
        schema, graphqlEndpoint: endpoint, context: async ({request}) => resolveContext(connection, request)
    })

}
export default getServer;