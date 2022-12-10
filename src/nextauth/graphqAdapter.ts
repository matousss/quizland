import {ApolloClient, gql} from "@apollo/client";
import {Resolvers} from "../__generated__/resolvers-types";
import type {AdapterUser} from "next-auth/adapters";

/** @returns {import('next-auth/adapters').Adapter} */
export default function GraphqlAdapter(client: ApolloClient<any>, options = {}) {
    return {
        async createUser(user: AdapterUser) {
            return
        },
        async getUser(id: string) {
            return await client.query<Resolvers['User']>({
                query: gql`query ExampleQuery($getUserId: ID!) {
                    getUser(id: $getUserId) {
                        
                    }
                }
                `
            })
        },
        async getUserByEmail(email) {
            return
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