import NextAuth from "next-auth"
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import CredentialsProvider from "next-auth/providers/credentials"

// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
const sequelize = require('/db/models').sequelize

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    // https://next-auth.js.org/providers/overview
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: RequestCredentials, req: any) {
                return {}
            }
        })
    ],
    adapter: SequelizeAdapter(sequelize),
})