import type {MongoClient} from "mongodb"
import {getAuthResolvers} from "./auth";

const users = [
    {
        id: '1',
        name: 'user001',
        email: 'a@b.c',
        emailVerified: null,
    },
    {
        id: '2',
        name: 'user002',
        email: 'x@y.z',
        emailVerified: null,
    }
]


export const getResolvers = (client: MongoClient) => {
    const authResolvers = getAuthResolvers(client);
    return {
        Query: {...authResolvers.Query},
        Mutation: {...authResolvers.Mutation},
    }
}

