import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {ApolloServer} from "@apollo/server";

import {resolvers} from "./_resolvers";
import {typeDefs} from "./_typedefs";


const apolloServer = new ApolloServer({typeDefs: typeDefs, resolvers: resolvers});


export default startServerAndCreateNextHandler(apolloServer)