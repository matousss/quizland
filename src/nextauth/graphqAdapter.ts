import {ApolloClient, gql} from "@apollo/client";
import {Resolvers, Provider} from "src/__generated__/resolvers-types";
import type {AdapterUser} from "next-auth/adapters";


const Fields = {
    AdapterUser: ['id', 'email', 'emailVerified']
}


/** @returns {import('next-auth/adapters').Adapter} */
export default function GraphqlAdapter(client: ApolloClient<any>, options = {}) {
    const providers = Object.values(Provider);

    return {
        async createUser(user: AdapterUser) {
            return
        },
        async getUser(id: string) {
            let user = await client.query<Resolvers['User']>({
                query: gql`query GetUsers($getUserId: ID!) {
                    getUserByID(id: $getUserId) {
                        ${Fields.AdapterUser}
                    }
                }`, variables: {getUserId: id}
            })
            return user;
        },
        async getUserByEmail(email: string) {
            return await client.query<Resolvers["User"]>({
                query: gql`query GetUsersByEmail($getUserEmail: String!) {
                    getUserByEmail(email: $getUserEmail) {
                        ${Fields.AdapterUser}
                    }
                }`, variables: {getUserEmail: email}
            });
        },
        async getUserByAccount({providerAccountId, provider}: { providerAccountId: string, provider: string }) {
            if (!providers.includes(provider as any)) return null;

            return await client.query<Resolvers["User"]>({
                query: gql`query GetUsersByAccount($providerAccountId: ID!, $provider: Provider!) {
                    getUserByAccount(providerAccountId: $providerAccountId, provider: $provider) {
                        ${Fields.AdapterUser}
                    }
                }`, variables: {providerAccountId: providerAccountId, provider: provider}
            });
        },
        async updateUser(user) {
            return
        },
        async deleteUser(userId: string) {
            return await client.mutate({
                mutation: gql`mutation DeleteUser($id: ID!) {
                    deleteUser(id: $id)
                }`, variables: {id: userId}
            });
        },
        async linkAccount(account) {
            return
        },
        async unlinkAccount({providerAccountId, provider}) {
            return
        },
        async createSession({sessionToken, userId, expires}) {
            return
        },
        async getSessionAndUser(sessionToken) {
            return
        },
        async updateSession({sessionToken}) {
            return
        },
        async deleteSession(sessionToken) {
            return
        },
        async createVerificationToken({identifier, expires, token}) {
            return
        },
        async useVerificationToken({identifier, token}) {
            return
        },
    }
}