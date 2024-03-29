import {GetServerSideProps} from "next";
import apolloClient from "src/graphql";
import {ApolloError, gql} from "@apollo/client";

import {parseBody} from "next/dist/server/api-utils/node";
import {setCookie} from "cookies-next";
import {AuthError} from "lib/page_errors/auth";

const Google = "GOOGLE"

const AUTH_MUTATION = gql`mutation Mutation($provider: ProviderType!, $code: String!) {
    authenticateUser(provider: $provider, code: $code) {
        token
        expiresAt
        user {
            id
            username
            surname
            lastname
            email
            image
        }
    }
}`

const error_redirect = (errorType?: number) => {
    let dest = "/auth/?error"
    if (errorType !== undefined) {
        dest += `=${errorType}`
    }

    return {
        redirect: {
            permanent: false,
            destination: dest
        }
    }
}
export const getServerSideProps: GetServerSideProps = async ({query, req, res}) => {
    const body = await parseBody(req, '12mb')

    const variables = {
        provider: Google,
        code: body.credential || query.code
    }

    if (!variables.code) {
        return error_redirect(AuthError.NO_CREDENTIALS)
    }

    let response;

    try {
        response = await apolloClient.mutate({
            mutation: AUTH_MUTATION,
            variables: variables
        })
    } catch (e) {
        console.log(e)
        if (e instanceof ApolloError) {
            return error_redirect()
        }
        return error_redirect(500)
    }

    let exp = new Date(response.data.authenticateUser.expires);


    setCookie("token", response.data.authenticateUser.token, {
        sameSite: "strict", secure: true, res: res, req: req, expires: exp
    })

    setCookie("user", JSON.stringify(response.data.authenticateUser.user), {
        sameSite: "strict", secure: true, res: res, req: req, expires: exp
    })


    return {
        redirect: {
            permanent: false,
            destination: "/home",
            response: res
        }
    }
}

const dummy = () => {}
export default dummy