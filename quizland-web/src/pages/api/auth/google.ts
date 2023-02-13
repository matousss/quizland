import {NextApiRequest, NextApiResponse} from "next";
import apolloClient from "src/apollo_client";
import {gql} from "@apollo/client";

import {ERROR_CODES} from "quizland-gql";
import { useSession } from "next-auth/react";

const PROVIDER = "GOOGLE"

const AUTH_QUERY = gql`query Query($provider: ProviderType!, $code: String!) {
    token: authenticateUser(provider: $provider, code: $code)
}`

const REGISTER_MUTATION = gql`mutation Mutation($provider: ProviderType!, $code: String!) {
    token: registerUser(provider: $provider, code: $code)
}`
const Google = async (req: NextApiRequest, res: NextApiResponse) => {
    /*console.log({req})/*
    console.log(res)*/
    let success = res.redirect(200, "/account")

    const { data: session } = useSession()

    if (session) return success

    if (!req.body.credential) {
        // todo add redirect
        return res.status(400).json({error: "No credential provided"})
    }

    const variables = {
        provider: PROVIDER,
        code: req.body.credential
    }
    let response;
    try {
        response = await apolloClient.query({
            query: AUTH_QUERY,
            variables: variables
        })
    }
    catch (e) {
        console.log(e)
        response = null
    }

    if (!response || !response.data.token) {
        try {
        response = await apolloClient.mutate({
            mutation: REGISTER_MUTATION,
            variables: variables
        })}
        catch (e) {
            console.log(e)
            return res.redirect(400, "/")
        }
    }
    // .setItem('TOKEN', response.data.token)

    return success
}

export default Google