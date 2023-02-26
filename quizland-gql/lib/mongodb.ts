import {Collection, MongoClient, ObjectId, Db, ServerApiVersion} from "mongodb";
import {DB_URL} from "./config";

import type {User, Account} from "../src/graphql/resolvers-types";
import {DCardSet, DItem} from "./types";


const AUTH_COLLECTIONS = {
    USERS: "users",
    ACCOUNTS: "accounts",
    //sessions: "sessions",
    //tokens: "tokens",
};

const QUIZ_COLLECTIONS = {
    ITEMS: "items",
    CARDS: "cards",
}
const AUTH_DB: string = 'auth';
const QUIZ_DB: string = 'quiz';


const to__id = (id: string | null | void) => {
    if ((id === null || id === void 0 ? void 0 : (id as string).length) !== 24)
        return new ObjectId();
    // @ts-ignore
    return new ObjectId(id);
}

const fromMongo = <T>(object: T & {_id: ObjectId}): T & {id: string} => {
    const newObject = {};
    for (let key in object) {
        // @ts-ignore
        const value = object[key];
        if (key === "_id") {
            // @ts-ignore
            newObject.id = (object._id as ObjectId).toString();
        } else {
            // @ts-ignore
            newObject[key] = value;
        }
    }
    return newObject as T & {id: string};
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

type SequenceDoc = { _id: string, value: number }

const getSequence = (collection: Collection<SequenceDoc>, id: any) => async () => {
    let response = await collection.findOneAndUpdate(
        {_id: id}, {$inc: {value: 1}}
    );

    if (!response.value) {
        await collection.insertOne({_id: id, value: 0});

        return 0;
    }

    return response.value.value
}

type WDbClient = {
    getID: () => Promise<number>;
    db: Db
}

declare type AuthDB = {
    Users: Collection<User>;
    Accounts: Collection<Account>;

} & WDbClient

declare type QuizDB = {
    Items: Collection<DItem>;
    Cards: Collection<DCardSet>;
} & WDbClient

type DBClient = {
    auth: AuthDB;
    quiz: QuizDB;
    mongoClient: MongoClient;
}
const getAuthDB = (client: MongoClient): AuthDB => {
    const _db = client.db(AUTH_DB);
    const c = AUTH_COLLECTIONS;
    const sequence = _db.collection<SequenceDoc>("sequence");
    return {
        Users: _db.collection<User>(c.USERS),
        Accounts: _db.collection<Account>(c.ACCOUNTS),
        getID: getSequence(sequence, c.USERS),
        db: _db
    };
}

const getQuizDB = (client: MongoClient): QuizDB => {
    const _db = client.db(QUIZ_DB);
    const c = QUIZ_COLLECTIONS;
    const sequence = _db.collection<SequenceDoc>("sequence");
    return {
        Items: _db.collection<DItem>(c.ITEMS),
        Cards: _db.collection<DCardSet>(c.CARDS),
        getID: getSequence(sequence, c.ITEMS),
        db: _db
    }
}

const mongoClient = new MongoClient(DB_URL || 'mongodb://localhost:27017',
    // @ts-ignore
    {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});


const getDBClient = async (mongoClient: MongoClient): Promise<DBClient> => {
    return {
        auth: getAuthDB(mongoClient),
        quiz:  getQuizDB(mongoClient),
        mongoClient: mongoClient
    }
}
export default mongoClient;
export {getDBClient, getAuthDB, getQuizDB, to__id, fromMongo, toMongo, AUTH_DB, AUTH_COLLECTIONS}
export type {AuthDB, QuizDB, DBClient}