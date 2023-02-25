import {getQueryResolvers} from "./query";
import {getMutationResolvers} from "./mutation";
import {DBClient} from "../../../../lib/mongodb";
export const getAuthResolvers = (client: DBClient) => {
    return {
        Query: getQueryResolvers(client.auth),
        Mutation: getMutationResolvers(client.auth, client.mongoClient)
    }
}
