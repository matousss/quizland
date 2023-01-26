import {ProviderType, User} from "src/__generated__/resolvers-types";
import type {AuthDB} from "lib/mongodb";
import {to__id} from "lib/mongodb";

const _id = to__id;
export const getQueryResolvers = (db: AuthDB) => ({
    getUsers: async (args: any) => {
        let arr = await db.Users.find().toArray();
        let result: Array<User> = [];
        console.log(result)
        return result;
        //todo not working
    },
    getUserByID: async (args: any, {id}: { id: string }) => {
        return await db.Users.findOne({_id: _id(id)});
    },
    getUserByEmail: async (email: string) => {
        return await db.Users.findOne({email: email});
    },
    authenticateUser: async (_: any, {provider, accessToken}: { provider: ProviderType, accessToken: string }) => {
        let provider_account_id = null

        switch (provider) {
            case ProviderType.Google:
                let response = await fetch(
                    "https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=" + accessToken
                ).then(res => res.json());
                // console.log({response});
                provider_account_id = response.sub;
            default:
                return null;
        }

        let account = await db.Accounts.findOne({provider_account_id: provider_account_id});
    }
})

