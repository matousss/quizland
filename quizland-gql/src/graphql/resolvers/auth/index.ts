import {MongoClient} from "mongodb";
import {getAuthDB} from "@lib/mongodb";
import {getQueryResolvers} from "./query";
import {getMutationResolvers} from "./mutation";
export const getAuthResolvers = (client: MongoClient) => {
    const db = getAuthDB(client);

    return {
        Query: getQueryResolvers(db),
        Mutation: getMutationResolvers(db)
    }
}