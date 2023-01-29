import type {CreateUserInput, User} from "@/__generated__/resolvers-types";
import type {AuthDB} from "@lib/mongodb";
import {to__id} from "@lib/mongodb";

const _id = to__id;
export const getMutationResolvers = (db: AuthDB) => ({
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
                //db.Tokens.deleteMany({userId: objId}),
                db.Users.deleteOne({_id: objId})
            ]
        );
    }
})