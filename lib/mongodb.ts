import {Collection, MongoClient, ObjectId} from "mongodb";
import type {User, Account, Token} from "src/__generated__/resolvers-types";


const AUTH_COLLECTIONS = {
    USERS: "users",
    ACCOUNTS: "accounts",
    //sessions: "sessions",
    //tokens: "tokens",
};
const AUTH_DB: string = 'auth';






const setupDB = (connection: MongoClient) => (async () => {

    const auth_db = connection.db(AUTH_DB);
    for (let i in AUTH_COLLECTIONS) {
        console.log(i)
        //await auth_db.createCollection<AdapterUser>(i)
    }
    return connection;
})


const toJS = (object: {}) => {
    const newObject = {};
    for (let key in object) {
        // @ts-ignore
        const value = object[key];
        if (key === "_id") {
            // @ts-ignore
            newObject.id = value.toHexString();
        }
        else if (key === "userId") {
            // @ts-ignore
            newObject[key] = value.toHexString();
        }
        else {
            // @ts-ignore
            newObject[key] = value;
        }
    }
    return newObject;
}

const to__id = (id: string | null | void) => {
    if ((id === null || id === void 0 ? void 0 : id.length) !== 24)
        return new ObjectId();
    // @ts-ignore
    return new ObjectId(id);
}

const toMongo = (object: {}) => {

        const newObject = {
            // @ts-ignore
        _id: to__id(object.id)
    };
    for (const key in object) {
        // @ts-ignore
        const value = object[key];
        if (key !== "id")
            // @ts-ignore
            newObject[key] = value;
    }
    return newObject;
}

declare type AuthDB = {
    Users: Collection<User>;
    Accounts: Collection<Account>;
};
const getAuthDB = (client: MongoClient): AuthDB => {
    const _db = client.db(AUTH_DB);
    const c = AUTH_COLLECTIONS;
    return {
        Users: _db.collection<User>(c.USERS),
        Accounts: _db.collection<Account>(c.ACCOUNTS)
    };
}

const mongoClient = new MongoClient(process.env.DB_URL || 'mongodb://localhost:27017');
export default mongoClient;
export {getAuthDB, to__id, AUTH_DB, AUTH_COLLECTIONS}
export type {AuthDB}