import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {getResolvers} from 'src/graphql/resolvers';
import {typeDefs} from 'src/graphql/typedefs';
import mongoClient from 'lib/mongodb';

const mongo_client = mongoClient;
const resolvers = getResolvers(mongo_client);

const apolloServer = new ApolloServer({typeDefs: typeDefs, resolvers: resolvers});


export default startServerAndCreateNextHandler(apolloServer)