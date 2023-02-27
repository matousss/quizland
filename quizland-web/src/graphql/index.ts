import {ApolloClient, InMemoryCache, MutationOptions, QueryOptions} from "@apollo/client";
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import WebSocket from 'ws'

const wsLink = new GraphQLWsLink(createClient({
        url: process.env.GRAPHQL_ENDPOINT_WS as string,
    webSocketImpl: WebSocket
    })
)

export const httpLink = new HttpLink(
    {
        uri: process.env.GRAPHQL_ENDPOINT_HTTP,
        headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_SECRET}`
        }
    }
)

// https://www.apollographql.com/docs/react/data/subscriptions/
const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const apolloClient = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: splitLink
})

export default apolloClient