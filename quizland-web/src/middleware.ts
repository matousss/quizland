import {NextMiddleware, NextRequest, NextResponse} from "next/server";
import {ApolloClient, ApolloError, gql, HttpLink, InMemoryCache} from "@apollo/client";
import {YogaLink} from "@graphql-yoga/apollo-link";

const getClient = (token?: string) => {

    return new ApolloClient({
        ssrMode: false,
        cache: new InMemoryCache(),
        link: new YogaLink({
            endpoint: process.env.GRAPHQL_ENDPOINT_HTTP,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

const CAN_READ = gql`
    query ($id: ID!) {
        canRead(id: $id) 
    }
`
const CAN_WRITE = gql`
    query ($id: ID!) {
        canWrite(id: $id)
    }
`

export const middleware:NextMiddleware = async (request, event) =>  {
    let client = getClient(request.cookies.get('token')?.value)
    let splitURL = request.url.split('/')
    let query = (splitURL[splitURL.length - 2] == 'edit') ? CAN_WRITE : CAN_READ

    try {await client.query({
        query: query,
        variables: {
            id: splitURL[splitURL.length - 1]
        }
    })}
    catch (e) {
        if (e instanceof ApolloError && (e as ApolloError).graphQLErrors[0]?.extensions.code !== 'PERMISSION_ERROR') console.log(e)
        return NextResponse.redirect(new URL('/home', request.url))
    }

    return
}
export const config = {
    matcher: ['/cardset/:path*', '/cardset/edit/:path*']
}