import {createYoga, createSchema} from 'graphql-yoga'
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'
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

const isDev = process.env.NODE_ENV === 'development'

async function getServer<TServerContext>(endpoint = "/") {
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
        context: async ({request}) => resolveContext(connection, request),
        graphiql: isDev,
        plugins: isDev ? [useDisableIntrospection()] : []
    })

}

export default getServer;