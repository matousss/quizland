import type {MongoClient} from "mongodb"
import {getAuthResolvers} from "./auth";


export const getResolvers = (client: MongoClient) => {
    const authResolvers = getAuthResolvers(client);
    return {
        Query: {...authResolvers.Query},
        Mutation: {...authResolvers.Mutation},
    }
}

