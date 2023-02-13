import {NextApiRequest, NextApiResponse} from "next";
import apolloClient from "src/apollo_client";
import {gql} from "@apollo/client";

import {ERROR_CODES} from "quizland-gql";
import { useSession } from "next-auth/react";
import Script from "next/script";

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


    if (!req.body.credential) {
        // todo add redirect
       // return <Script>res.redirect(400, "/login").send({error: "No credential provided"})</Scirpt>
        return
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
            res.redirect(400, "/").send({error: "Failed to register user"})
        }
    }
    // .setItem('TOKEN', response.data.token)

    success.send({})
}

export default Google