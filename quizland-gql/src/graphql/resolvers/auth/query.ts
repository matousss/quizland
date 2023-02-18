import {ProviderType, User} from "../../../__generated__/resolvers-types";
import {to__id} from "../../../../lib/mongodb";
import {AuthDB} from "../../../../lib/mongodb";

import {QueryResolvers} from "../types";
import {generateJWT} from "../../../auth/util";
import {resolvers as auth_resolvers, UserInfo} from "../../../auth";
import {ProviderUserNotFound} from "../../../../lib/graphql/error";

const _id = to__id;


export const getQueryResolvers = (db: AuthDB): QueryResolvers => ({
    getUsers: async () => {
        let arr = await db.Users.find({}).toArray();
        let result: Array<User> = [];
        return result;
        //todo not working
    },
    getUserByID: async (_, {id}) => {
        return await db.Users.findOne({_id: _id(id)});
    },
    getUserByEmail: async (_, {email}, ctx) => {
        return await db.Users.findOne({email: email});
    },
    authenticateUser: async (_: any, {provider, code}) => {
        let externalUser: UserInfo;
        try {
            externalUser = await auth_resolvers[provider](code);
        }
        catch (e) {
            externalUser = null;
        }
        if (!externalUser) {
            throw new ProviderUserNotFound(provider);
        }

        let account = await db.Accounts.findOne({providerAccountId: externalUser.id});

        if (!account) {
            return null;
        }

        // @ts-ignore
        let user = await db.Users.findOne({_id: account.user});

        let jwt = generateJWT(account.user);

        return {token: jwt, user: user}

    }
})

