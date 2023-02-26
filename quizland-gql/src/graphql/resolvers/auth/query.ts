import {fromMongo, to__id} from "../../../../lib/mongodb";
import {AuthDB} from "../../../../lib/mongodb";

import {QueryResolvers} from "../types";

const _id = to__id;


export const getQueryResolvers = (db: AuthDB): QueryResolvers => ({
    getUserByID: async (_, {id}) => {
        return fromMongo(await db.Users.findOne({_id: _id(id)}));
    },
    getUserByEmail: async (_, {email}) => {
        return fromMongo(await db.Users.findOne({email: email}));
    }
})

