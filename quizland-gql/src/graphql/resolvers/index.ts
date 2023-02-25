import {getAuthResolvers} from "./auth";
import {getQuizResolvers} from "./quiz";
import {DBClient} from "../../../lib/mongodb";


export const getResolvers = (dbClient: DBClient) => {
    const authResolvers = getAuthResolvers(dbClient);
    const quizResolvers = getQuizResolvers(dbClient);
    return {
        Query: {...authResolvers.Query, ...quizResolvers.Query},
        Mutation: {...authResolvers.Mutation, ...quizResolvers.Mutation},
    }
}

