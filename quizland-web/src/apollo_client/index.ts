import {readFileSync} from "fs";
import {buildSchema} from "graphql/utilities";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {SchemaLink} from "@apollo/client/link/schema";

const apolloClient = async () => {
    const cl = new ApolloClient({
        ssrMode: true,
        //link: new SchemaLink({schema: schema}),
        uri: 'http://localhost:3000/api/graphql',
        cache: new InMemoryCache()
    })

    return cl
}

export default await apolloClient()