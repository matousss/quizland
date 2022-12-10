import NextAuth from "next-auth"
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import CredentialsProvider from "next-auth/providers/credentials"

const sequelize = require('/db/models')

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
    adapter: SequelizeAdapter(sequelize),
}

export default NextAuth(options)