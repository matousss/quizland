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
    }
})

