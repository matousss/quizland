// import mongoClient, {AUTH_COLLECTIONS, AUTH_DB} from 'lib/mongodb'
// import {MongoClient} from "mongodb";
const mongodb = require('lib/mongodb')
const mondoClient = mongodb.default;
const {AUTH_DB, AUTH_COLLECTIONS} = mongodb;

const setupDB = async () => {
    const mongo = await mongoClient.connect();
    const auth_db = mongo.db(AUTH_DB);
    for (let i in AUTH_COLLECTIONS) {
        console.log(i)
        //await auth_db.createCollection<AdapterUser>(i)
    }
};

setupDB().then(() => console.log("Database Setup Finished")).catch(console.error)