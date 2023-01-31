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
    authenticateUser: async (_: any, {provider, code, state}) => {
        let provider_account_id = null
        let signup = false;
        let userInfo = null;

        userInfo = await auth_resolvers[provider](code);

        let account = await db.Accounts.findOne({provider_account_id: provider_account_id});

        if (signup) {


        }
        else if (!account) {
            return null;
        }



        let jwt = generateJWT(account.user);
    }
})

