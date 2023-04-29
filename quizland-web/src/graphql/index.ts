import {ApolloClient, InMemoryCache} from "@apollo/client";


import { YogaLink } from '@graphql-yoga/apollo-link'

/*
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';

const wsLink = new GraphQLWsLink(createClient({
        url: process.env.GRAPHQL_ENDPOINT_WS as string
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
);*/


// only for server
const apolloClient = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new YogaLink({
        endpoint: process.env.GRAPHQL_ENDPOINT_HTTP,
        headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_SECRET}`
        }
    })
})

export default apolloClient