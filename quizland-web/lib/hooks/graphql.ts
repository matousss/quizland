import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {useRouter} from "next/router";

export function useGQL() {
    const router = useRouter();


    return new ApolloClient({
        ssrMode: false,
        cache: new InMemoryCache(),
        link: new HttpLink(
            {
                uri: '/' + process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
                credentials: 'same-origin'
            }
        )
    })
}
