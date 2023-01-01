import {MongoClient} from "mongodb";

const mongoClient = new MongoClient(process.env.DB_URL || 'mongodb://localhost:27017');

const AUTH_COLLECTIONS = {
    users: "users",
    accounts: "accounts",
    sessions: "sessions",
    verificationTokens: "verification_tokens",
};
const AUTH_DB = 'auth';
export default mongoClient;
export {AUTH_COLLECTIONS, AUTH_DB};