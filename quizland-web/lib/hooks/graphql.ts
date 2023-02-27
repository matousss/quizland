import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";


export function useGQL() {
    return new ApolloClient({
        ssrMode: false,
        cache: new InMemoryCache(),
        link: new HttpLink(
            {
                uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
                credentials: 'same-origin'
            }
        )
    })
}