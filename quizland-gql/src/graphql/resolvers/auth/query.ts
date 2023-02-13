import {ProviderType, User} from "../../../__generated__/resolvers-types";
import {to__id} from "../../../../lib/mongodb";
import {AuthDB} from "../../../../lib/mongodb";

import {QueryResolvers} from "../types";
import {generateJWT} from "../../../auth/util";
import {resolvers as auth_resolvers} from "../../../auth";

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
        let externalUser = await auth_resolvers[provider](code);
        if (!externalUser) {
            return null;
        }

        console.log("asking for account")
        let account = await db.Accounts.findOne({providerAccountId: externalUser.id});

        if (!account) {
            return null;
        }

        let jwt = generateJWT(account.user);

        return jwt

    }
})

