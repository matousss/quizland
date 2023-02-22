import type {MongoClient} from "mongodb"
import {getAuthResolvers} from "./auth";
import {getQuizResolvers} from "./quiz";


export const getResolvers = (client: MongoClient) => {
    const authResolvers = getAuthResolvers(client);
    const quizResolvers = getQuizResolvers(client);
    return {
        Query: {...authResolvers.Query, ...quizResolvers.Query},
        Mutation: {...authResolvers.Mutation, ...quizResolvers.Mutation},
    }
}

