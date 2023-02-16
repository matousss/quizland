import {readFileSync} from "fs";
import {buildSchema} from "graphql/utilities";
import {ApolloClient, createHttpLink, InMemoryCache, MutationOptions, QueryOptions} from "@apollo/client";
import {SchemaLink} from "@apollo/client/link/schema";


const apolloClient = new ApolloClient({
    ssrMode: true,
    //link: new SchemaLink({schema: schema}),
    cache: new InMemoryCache(),
    link: createHttpLink(
        {
            uri: process.env.GRAPHQL_ENDPOINT,
            headers: {
                Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`
            }
        }
    )
})

const queryFetcher = (options: QueryOptions) => apolloClient.query(options)
const mutationFetcher = (options: MutationOptions) => apolloClient.mutate(options)

export default apolloClient