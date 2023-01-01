import {MongoClient, ObjectId} from "mongodb";


const AUTH_COLLECTIONS = {
    users: "users",
    accounts: "accounts",
    sessions: "sessions",
    verificationTokens: "verification_tokens",
};
const AUTH_DB: string = 'auth';

export {AUTH_COLLECTIONS, AUTH_DB};

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

const mongoClient = new MongoClient(process.env.DB_URL || 'mongodb://localhost:27017');

export default mongoClient;