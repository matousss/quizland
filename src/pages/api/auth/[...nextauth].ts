import NextAuth from "next-auth"
import GraphqlAdapter from 'src/nextauth/graphqAdapter'
import CredentialsProvider from "next-auth/providers/credentials"

import apolloClient from 'lib/graphql'


const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "username"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                // todo implement
                if (true) {
                    return Object(credentials)
                }
                return null
            }
        })
    ],
    adapter: GraphqlAdapter(apolloClient),
}

// @ts-ignore
export default NextAuth(options)