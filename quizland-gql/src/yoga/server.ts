import {createYoga, createSchema} from 'graphql-yoga'
import mongoClient, {getDBClient} from "../../lib/mongodb";
import {getResolvers, typeDefs} from "../graphql";
import {Context, resolveContext} from "../graphql/context";
import {applyMiddleware} from "graphql-middleware";
import {getPermissions} from "../shield/permissions";
import {directiveTransformers} from "../directives/transformers";

export const config = {
    api: {
        bodyParser: false
    }
}


async function getServer<TServerContext>(endpoint = "/graphql") {
    console.log('Connecting to mongo...');
    let connection;
    try {
        connection = await mongoClient.connect();
    } catch (e) {
        console.error('Could not connect to mongo', e);
        process.exit(1);
    }
    console.log('Client connected to mongo')

    const schema = createSchema<Context & TServerContext>({
        typeDefs: typeDefs,
        resolvers: getResolvers(await getDBClient(connection))
    })

    const protectedSchema = applyMiddleware<Context & TServerContext>(schema, getPermissions(await getDBClient(connection)));
    const directiveSchema = () => {
        return directiveTransformers.reduce((curSchema, transformer) => transformer(curSchema), protectedSchema)
    }


    return createYoga<TServerContext, Context>({
        schema: directiveSchema,
        graphqlEndpoint: endpoint,
        context: async ({request}) => resolveContext(connection, request)
    })

}

export default getServer;