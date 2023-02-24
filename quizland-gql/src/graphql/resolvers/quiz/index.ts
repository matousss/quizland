import {MongoClient} from "mongodb";
import {getQuizDB} from "../../../../lib/mongodb";
import {getQueryResolvers} from "./query";
import {getMutationResolvers} from "./mutation";
export const getQuizResolvers = (client: MongoClient) => {
    const db = getQuizDB(client);

    return {
        Query: getQueryResolvers(db),
        Mutation: getMutationResolvers(db)
    }
}
