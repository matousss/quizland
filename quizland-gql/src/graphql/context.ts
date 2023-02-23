import {BaseContext} from "@apollo/server";
import {MongoClient} from "mongodb";
import {Role, User} from "../__generated__/resolvers-types";
import {verifyJWT} from "../auth/util";
import {AUTH_COLLECTIONS, AUTH_DB, to__id} from "../../lib/mongodb";
import {NodeRequest, NodeResponse} from "@whatwg-node/server";

// @ts-ignore
const nextClient: User = {
    id: '@next',
    role: Role.Server,
    username: 'QuitLand',
}

const specialUsers = {
    next: nextClient
}

interface Context extends BaseContext {
    user: {} | null;
}

const resolveContext = async (mongo: MongoClient, req: NodeRequest, res?: NodeResponse): Promise<Context> => {
    const getUserFromRequest = async (): Promise<User | null> => {
        // extract token


        let headerMap = req.headers['map'];
        let cookie = headerMap.get('cookie') as string;
        let token;
        if (cookie !== undefined){
            token = cookie.split(';').map(v => v.trim().split('=')).find(v => v[0] === 'token')?.[1];
        }
        else token = (req.headers['headersInit']['authorization']).replace('Bearer ')

        if (!token) return null;
        // verify token
        let info = await verifyJWT(token);
        if (!info) return null;

        if (info.id.startsWith('@')) {
            return specialUsers[info.id.substring(1)];
        }

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