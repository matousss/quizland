import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {getResolvers} from '../../graphql/resolvers';
import {typeDefs} from '../../graphql/typedefs';
import { MongoClient } from 'mongodb';
import {NextApiRequest, NextApiResponse} from "next";
import {printType} from "graphql/utilities";
import {GraphQLSchema} from "graphql/type";

const mongo_client = new MongoClient(process.env.DB_URL || 'mongodb://localhost:27017');
const resolvers = getResolvers(mongo_client);

const apolloServer = new ApolloServer({typeDefs: typeDefs, resolvers: resolvers});


export default startServerAndCreateNextHandler(apolloServer)