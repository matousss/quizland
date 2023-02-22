import type {Account, User} from "../../../__generated__/resolvers-types";
import {Role} from "../../../__generated__/resolvers-types";
import type {AuthDB} from "../../../../lib/mongodb";
import {fromMongo, to__id} from "../../../../lib/mongodb";
import {resolvers as auth_resolvers, UserInfo} from "../../../auth";
import {DEFAULT_TOKEN_LIFESPAN, generateJWT} from "../../../auth/util";
import {
    DuplicitAccountError,
    DuplicitEmailError, ERROR_CODES, GQLError,
    NotLinkedAccountError,
    ProviderUserNotFound
} from "../../../../lib/graphql/error";

const _id = to__id;
export const getMutationResolvers = (db: AuthDB) => ({
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

            let plainUser = fromMongo(user);

            let exp = Date.now() + DEFAULT_TOKEN_LIFESPAN * 1000;
            let jwt = generateJWT(plainUser as User);

            return {token: jwt, user: plainUser, expiresAt: exp}
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

        if (!response.ok) throw new GQLError("Could not create account", {code: ERROR_CODES.WRITE_ERROR})


        let exp = Date.now() + DEFAULT_TOKEN_LIFESPAN * 1000;

        user.id = user_id;
        let plainUser = fromMongo(user);

        return {
            token: generateJWT(plainUser as User),
            expiresAt: exp,
            user: plainUser
        }


    }
})