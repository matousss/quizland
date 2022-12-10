import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'localhost:3000/api/graphql',
});

const HYGRAPH_PERMANENTAUTH_TOKEN = ''

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${HYGRAPH_PERMANENTAUTH_TOKEN}`
        }
    };
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default apolloClient;