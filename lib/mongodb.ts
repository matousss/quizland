import {MongoClient} from "mongodb";

const mongoClient = new MongoClient(process.env.DB_URL || 'mongodb://localhost:27017')

export default mongoClient