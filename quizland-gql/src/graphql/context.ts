import {MongoClient} from "mongodb";
import {Role, User} from "./resolvers-types";
import {verifyJWT} from "../../lib/jwt";
import {AUTH_COLLECTIONS, AUTH_DB, to__id} from "../../lib/mongodb";
import {NodeRequest, NodeResponse} from "@whatwg-node/server";

// @ts-ignore
const nextClient: User = {
    id: '@next',
    role: Role.Server,
    username: 'QuizLand',
    image: '/assets/logo_small.svg'
}

export const specialUsers = {
    next: nextClient
}

interface Context {
    user: User | null;
}

// noinspection JSUnusedLocalSymbols
const resolveContext = async (mongo: MongoClient, req: NodeRequest, res?: NodeResponse): Promise<Context> => {
    const getUserFromRequest = async (): Promise<User | null> => {
        // extract token

        let headerMap = req.headers?.headersInit || req.headers['map'];
        let cookie
        try {
            cookie = headerMap.get instanceof Function ? headerMap.get('cookie') : headerMap['cookie'] as string;
        } catch (e) {
        }

        let token;
        if (cookie !== undefined) {
            token = cookie.split(';').map(v => v.trim().split('=')).find(v => v[0] === 'token')?.[1];
        } else {
            let authHeader
            try {
                authHeader = headerMap['authorization'] || headerMap.get('authorization')
            } catch {
            }
            token = authHeader ? authHeader.replace('Bearer ', '') : null;
        }
        if (!token) return null;
        // verify token
        let info = await verifyJWT(token);

        if (info === null) return null;
        if (info.id.startsWith('@')) {
            return specialUsers[info.id.substring(1)];
        }

        // get user
        // noinspection UnnecessaryLocalVariableJS
        let user = await mongo.db(AUTH_DB).collection<User>(AUTH_COLLECTIONS.USERS).findOne({_id: to__id(info.id)});
        if (user) return {id: user._id.toString(), ...user}
        return null;

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