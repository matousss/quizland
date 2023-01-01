import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {getResolvers} from 'src/graphql/resolvers';
import {typeDefs} from 'src/graphql/typedefs';
import mongoClient from 'lib/mongodb';




const startServer = async () => {
    const resolvers = getResolvers(await mongoClient.connect());
    const apolloServer = new ApolloServer({typeDefs: typeDefs, resolvers: resolvers});
    return startServerAndCreateNextHandler(apolloServer)
}

export default await startServer()