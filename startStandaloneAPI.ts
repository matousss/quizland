import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "src/graphql/typedefs";
import {getResolvers} from "src/graphql/resolvers";
import mongoClient from "lib/mongodb";

const resolvers = getResolvers(mongoClient);
const apolloServer = new ApolloServer(
    {typeDefs: typeDefs, resolvers: resolvers}
);

startStandaloneServer(apolloServer);