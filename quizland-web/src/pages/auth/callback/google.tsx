import {GetServerSideProps, NextApiRequest, NextApiResponse, NextPage} from "next";
import apolloClient from "src/graphql";
import {ApolloError, gql} from "@apollo/client";

import {ERROR_CODES} from "quizland-gql";
import {parseBody} from "next/dist/server/api-utils/node";
import {getCookies, setCookie, setCookies} from "cookies-next";
import {AuthError} from "lib/auth/errors";

const Google = "GOOGLE"

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

const error_redirect = (errorType?: AuthErrors) => ({
    redirect: {
        permanent: false,
        destination: "/login?error" + errorType ? '=' + errorType : ''
    }
})
export const getServerSideProps: GetServerSideProps = async ({query, req, res}) => {
    const body = await parseBody(req, '12mb')


    const variables = {
        provider: Google,
        code: body.credential || query.code
    }

    if (!variables.code) {
        return error_redirect(AuthError.NO_CREDENTIALS_PROVIDED)
    }

    let response;

    try {
        response = await apolloClient.query({
            query: AUTH_QUERY,
            variables: variables
        })
    } catch (e) {
        if (e instanceof ApolloError) {
            if (e.graphQLErrors[0].extensions.code === ERROR_CODES.USER_NOT_FOUND) {
                return error_redirect(AuthError.USER_NOT_FOUND)
            }
        }
    }

    if (!response || !response.data.authenticateUser.token)
        try {
            response = await apolloClient.mutate({
                mutation: REGISTER_MUTATION,
                variables: variables
            })
        } catch (e) {
            return error_redirect()
        }



    setCookie("token", response.data.authenticateUser.token, {
        sameSite: "strict", secure: true, res: res, req: req
    })

    // setCookie("user", JSON.stringify(response.data.authenticateUser.user), {
    //     sameSite: "strict", secure: false, res: res, req: req
    // })

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