import {BaseContext} from "@apollo/server";
import {MongoClient} from "mongodb";
import {IncomingMessage, ServerResponse} from "http";
import {User} from "../__generated__/resolvers-types";
import {verifyJWT, JWTPayload} from "../auth/util";
import {AUTH_COLLECTIONS, AUTH_DB, to__id} from "../../lib/mongodb";


interface Context extends BaseContext {
    user: {} | null;
}

const resolveContext = async (mongo: MongoClient, req: IncomingMessage | Request, res?: ServerResponse): Promise<Context> => {
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



export type {Context};
export {resolveContext}