import {ApolloClient, gql} from "@apollo/client";
import {Resolvers} from "src/__generated__/resolvers-types";
import type {AdapterUser} from "next-auth/adapters";


const Fields = {
    AdapterUser: ['id', 'email', 'emailVerified']
}


/** @returns {import('next-auth/adapters').Adapter} */
export default function GraphqlAdapter(client: ApolloClient<any>, options = {}) {
    return {
        async createUser(user: AdapterUser) {
            return
        },
        async getUser(id: string) {
            let user = await client.query<Resolvers['User']>({
                query: gql`query GetUsers($getUserId: ID!) {
                    getUserID(id: $getUserId) {
                        ${Fields.AdapterUser}
                    }
                }
                `
            })
            console.log(user)
            return user;
        },
        async getUserByEmail(email: string) {
            return await client.query<Resolvers["User"]>({
                query: gql`query GetUsersByEmail($getUserEmail: String!) {
                    getUserEmail(email: $getUserEmail) {
                        ${Fields.AdapterUser}
                    }
                }
                `
            });
        },
        async getUserByAccount({providerAccountId, provider}) {
            return
        },
        async updateUser(user) {
            return
        },
        async deleteUser(userId) {
            return
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