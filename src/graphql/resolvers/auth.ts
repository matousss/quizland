import type {MongoClient} from "mongodb";
import {AUTH_COLLECTIONS, AUTH_DB} from "lib/mongodb";

const getDB = async (client: MongoClient) =>
{
    const _client = await client;
    const _db = _client.db(AUTH_DB);
    const c = AUTH_COLLECTIONS;
    return {
        Users: _db.collection(c.users),
        Accounts: _db.collection(c.accounts),
        Sessions: _db.collection(c.sessions),
        VerTokens: _db.collection(c.verificationTokens),
    };
}



const Query = {

}