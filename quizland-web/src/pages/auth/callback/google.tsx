import {GetServerSideProps, NextApiRequest, NextApiResponse, NextPage} from "next";
import apolloClient from "src/apollo_client";
import {gql} from "@apollo/client";

import {ERROR_CODES} from "quizland-gql";
import Router from "next/router";
import {parseBody} from "next/dist/server/api-utils/node";
import {getCookies, setCookie, setCookies} from "cookies-next";
import {NextIncomingMessage} from "next/dist/server/request-meta";
import {IncomingMessage, ServerResponse } from "node:http";
import {redirect} from "next/navigation";

const PROVIDER = "GOOGLE"

const AUTH_QUERY = gql`query Query($provider: ProviderType!, $code: String!) {
    authenticateUser(provider: $provider, code: $code) {
        token
        user {
            id
            username
            surname
            lastname
            email
        }
    }
}`

const REGISTER_MUTATION = gql`mutation Mutation($provider: ProviderType!, $code: String!) {
    token: registerUser(provider: $provider, code: $code)
}`

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const body = await parseBody(req, '12mb')
    const error_redirect = {
        redirect: {
            permanent: false,
            destination: "/login?error"
        }
    }

    if (!body.credential) {
        return error_redirect
    }

    const variables = {
        provider: PROVIDER,
        code: body.credential
    }
    console.log("achjo")
    let response;
    console.log("negrovina")
    try {
        console.log("loggin in")
        console.log("loggin in")
        response = await apolloClient.query({
            query: AUTH_QUERY,
            variables: variables
        })
    } catch (e) {
        console.log(e)
        response = null
    }
    console.log("co to kurba")
    console.log(response)
    if (!response || !response.data.authenticateUser.token)
        try {
            response = await apolloClient.mutate({
                mutation: REGISTER_MUTATION,
                variables: variables
            })
        } catch (e) {
            console.log(e)
            return error_redirect
        }



    setCookie("token", response.data.authenticateUser.token, {
        sameSite: "strict", secure: true, res: res, req: req
    })

    setCookie("user", JSON.stringify(response.data.authenticateUser.user), {
        sameSite: "strict", secure: false, res: res, req: req
    })

    console.log(getCookies({res: res, req: req}))
    return {
        redirect: {
            permanent: false,
            destination: "/account",
            response: res
        }
    }
}

export default () => {}