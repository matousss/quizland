import type {MongoClient} from "mongodb";
import {ObjectId, Filter} from "mongodb";
import {AUTH_COLLECTIONS, AUTH_DB} from "lib/mongodb";
import type {User, CreateUserInput} from "src/__generated__/resolvers-types";

const getDB = (client: MongoClient) => {
    const _db = client.db(AUTH_DB);
    const c = AUTH_COLLECTIONS;
    return {
        Users: _db.collection<User>(c.users),
        Accounts: _db.collection(c.accounts),
        Sessions: _db.collection(c.sessions),
        VerTokens: _db.collection(c.verificationTokens),
    };
}

const _id = (id: string) => new ObjectId(id);

export const getAuthResolvers = (client: MongoClient) => {
    const db = getDB(client);

    return {
        Query: {
            getUsers: async (args: any) => {
                let arr = await db.Users.find().toArray();
                let result: Array<User> = [];
                console.log(result)
                return result;
                //todo not working
            },
            getUserByID: async (args: any, {id}: {id: string}) => {
                return await db.Users.findOne({_id: _id(id)});
            },
            getUserByEmail: async (email: string) => {
                return await db.Users.findOne({email: email});
            },
        },
        Mutation: {
            createUser: async (args: any, {input}: { input: CreateUserInput }) => {
                if (await db.Users.findOne({email: input.email})) throw new Error("Email already used");
                await db.Users.insertOne(input);
                return await db.Users.findOne({email: input.email});
            },
            updateUser: async (user: User) => {
                return await db.Users.updateOne({_id: _id(user.id)}, {$set: user});
            },
            deleteUser: async ({id}: { id: string }) => {
                console.log({id});
                let objId = _id(id);
                await Promise.all([
                        db.Accounts.deleteMany({userId: objId}),
                        db.Sessions.deleteMany({userId: objId}),
                        db.Users.deleteOne({_id: objId})
                    ]
                );
            }
        }
    }
}