import type {MongoClient} from "mongodb";
import {ObjectId, Filter} from "mongodb";
import {AUTH_COLLECTIONS, AUTH_DB} from "lib/mongodb";
import {common} from "@apollo/protobufjs";
import get = common.get;

const getDB = (client: MongoClient) =>
{
    const _db = client.db(AUTH_DB);
    const c = AUTH_COLLECTIONS;
    return {
        Users: _db.collection(c.users),
        Accounts: _db.collection(c.accounts),
        Sessions: _db.collection(c.sessions),
        VerTokens: _db.collection(c.verificationTokens),
    };
}


export const getAuthResolvers = (client: MongoClient) => {
    const db = getDB(client);

    return {
        Query: {
            getUsers: async () => {
                let arr = await db.Users.find().toArray();
                let result = [];

            },
            getUsersID: async (id: string) => {
                return await db.Users.findOne({_id: id})
            }
        }
    }
}