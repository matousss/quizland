import type {MongoClient} from "mongodb";
import {ObjectId, Filter} from "mongodb";
import {AUTH_COLLECTIONS, AUTH_DB} from "lib/mongodb";
import {common} from "@apollo/protobufjs";
import get = common.get;
import type {User, CreateUserInput} from "../../__generated__/resolvers-types";

const getDB = (client: MongoClient) =>
{
    const _db = client.db(AUTH_DB);
    const c = AUTH_COLLECTIONS;
    return {
        Users: _db.collection(c.users),
        Accounts: _db.collection(c.accounts),
        Sessions: _db.collection(c.sessions),
        VerTokens: _db.collection(c.verificationTokens),
    };
}


export const getAuthResolvers = (client: MongoClient) => {
    const db = getDB(client);

    return {
        Query: {
            getUsers: async () => {
                let arr = await db.Users.find().toArray();
                let result: Array<User> = [];
                return result;
            },
            getUserByID: async (id: string) => {
                return await db.Users.findOne({_id: id});
            },
            getUserByEmail: async (email: string) => {
                return await db.Users.findOne({email: email});
            },
        },
        Mutation: {
            createUser: async (args: any, {input}: {input: CreateUserInput}) => {
                if (await db.Users.findOne({email: input.email})) throw new Error("Email already used");
                await db.Users.insertOne(input);
                return await db.Users.findOne({email: input.email});
            },
            updateUser: async (user: User) => {
                return await db.Users.updateOne({_id: user.id}, {$set: user});
            },
            deleteUser: async (id: string) => {
                return await db.Users.deleteOne({_id: id});
            }
        }
    }
}