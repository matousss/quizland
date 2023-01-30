import {ApolloServer, BaseContext} from '@apollo/server';
import {getResolvers, typeDefs} from '../graphql';
import mongoClient, {AUTH_COLLECTIONS, AUTH_DB, to__id} from '../../lib/mongodb';
import {verifyJWT} from "../auth/util";

import type {MongoClient} from "mongodb";
//import type {NextApiRequest, NextApiResponse} from 'next';
import type {User} from "../__generated__/resolvers-types";
import {IncomingMessage, ServerResponse} from "http";

interface Context extends BaseContext {
    user: {} | null;
}

const resolveContext = async (mongo: MongoClient, req: IncomingMessage, res: ServerResponse): Promise<Context> => {
    const getUserFromRequest = async (): Promise<User | null> => {
        // extract token
        let headers = req.headers;
        if (!headers.hasOwnProperty('authorization') || !headers['authorization']) return null;
        let token = headers['authorization'] as string;

        // verify token
        let info = await verifyJWT(token);
        if (!info) return null;

        // get user
        // noinspection UnnecessaryLocalVariableJS
        let user = await mongo.db(AUTH_DB).collection<User>(AUTH_COLLECTIONS.USERS).findOne({_id: to__id(info.id)});

        return user;

    }

    let user = await getUserFromRequest();
    // if (!user) {
    //     throw new GraphQLError('User is not authenticated', {
    //         extensions: {
    //             code: 'UNAUTHENTICATED',
    //             http: { status: 401 },
    //         }
    //     });
    // }

    return {user: user};
}


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
export type {Context};