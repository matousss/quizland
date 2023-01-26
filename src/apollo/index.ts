import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {getResolvers} from 'src/graphql/resolvers';
import {typeDefs} from 'src/graphql/typedefs';
import mongoClient, {AUTH_COLLECTIONS, AUTH_DB, to__id} from 'lib/mongodb';
import {verifyJWT} from "src/auth/util";

import type {MongoClient} from "mongodb";
import type {NextApiRequest} from 'next';
import type {User} from "src/__generated__/resolvers-types";
interface Context {
    user: {  } |null;
}

const resolveContext = async (mongo:MongoClient, req: NextApiRequest) => {
    const getUserFromRequest = async (): Promise<User|null> => {
        // extract token
        let headers = req.headers;
        if (!headers.hasOwnProperty('authorization') || !headers['authorization']) return null;
        let token = headers['authorization'] as string;

        // verify token
        let info = await verifyJWT(token);
        if (!info) return null;

        // get user
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

    return {user: user} as Context;
}


const startServer = async () => {
    let connection = await mongoClient.connect();
    const resolvers = getResolvers(connection);
    const apolloServer = new ApolloServer<Context>({typeDefs: typeDefs, resolvers: resolvers});
    // @ts-ignore
    return startServerAndCreateNextHandler(apolloServer,
        {context: async (args: NextApiRequest) => await resolveContext(connection, args)})
}

export default startServer;