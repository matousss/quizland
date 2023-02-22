import type {Account, CreateUserInput, User} from "../../../__generated__/resolvers-types";
import {Role} from "../../../__generated__/resolvers-types";
import type {AuthDB} from "../../../../lib/mongodb";
import {to__id} from "../../../../lib/mongodb";
import {resolvers as auth_resolvers, UserInfo} from "../../../auth";
import {generateJWT} from "../../../auth/util";
import {DuplicitAccountError, DuplicitEmailError, NotLinkedAccountError, ProviderUserNotFound} from "../../../../lib/graphql/error";

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
        let objId = _id(id);
        await Promise.all([
                db.Accounts.deleteMany({userId: objId}),
                //db.Tokens.deleteMany({userId: objId}),
                db.Users.deleteOne({_id: objId})
            ]
        );
    },
    authenticateUser: async (args: any, {provider, code, state}) => {
        let externalUser: UserInfo;

        externalUser = await auth_resolvers[provider](code);

        if (!externalUser) {
            throw new ProviderUserNotFound(provider)
        }

        let user: User = await db.Users.findOne({email: externalUser.email});
        let account: Account = await db.Accounts.findOne({providerAccountId: externalUser.id, provider: provider});

        if (user) {
            if (user.email !== externalUser.email) throw new DuplicitEmailError(provider)

            if (!account) throw new NotLinkedAccountError(provider)

            if (account.providerAccountId !== externalUser.id) throw new DuplicitAccountError(provider)

            let jwt = generateJWT(account.user);

            return {token: jwt, user: user}
        }

        user = {
            email: externalUser.email,
            surname: externalUser.surname,
            lastname: externalUser.lastname,
            role: Role.User
        }

        if (externalUser.image) {
            user.image = externalUser.image;
        }

        account = {
            provider: provider,
            providerAccountId: externalUser.id
        }
        let user_id
        let session = await db.client.startSession();
        let response;
        try {
            response = await session.withTransaction(async () => {
                let user_result = await db.Users.insertOne(user, {session});
                user_id = user_result.insertedId;
                // @ts-ignore
                account.user = user_id;
                console.log("inserting account")
                await db.Accounts.insertOne(account, {session});
            })
        } finally {
            session.endSession()
        }

        // if (session.acknowledged === false) {
        //     throw new GraphQLError("Could not create account", {code: ERROR_CODES.WRITE_ERROR})
        // }

        if (response.ok) {
            return {
                token: generateJWT(user_id),
                user: user
            }
        }

    }
})