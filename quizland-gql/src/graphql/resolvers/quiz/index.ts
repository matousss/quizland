import {getQueryResolvers} from "./query";
import {getMutationResolvers} from "./mutation";
export const getQuizResolvers = (dbClient) => {
    return {
        Query: getQueryResolvers(dbClient),
        Mutation: getMutationResolvers(dbClient)
    }
}
