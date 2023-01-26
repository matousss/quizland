import {User} from "src/__generated__/resolvers-types";
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
})

