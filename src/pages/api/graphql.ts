import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {getResolvers} from 'src/graphql/resolvers';
import {typeDefs} from 'src/graphql/typedefs';
import mongoClient from 'lib/mongodb';


interface Context {
    user: {  } |null;
}
const resolveContext = async ({req, res}: {req: any, res:any}) => {
    console.log({req});
    console.log({res});
    return {user: null} as Context;
}
const startServer = async () => {
    const resolvers = getResolvers(await mongoClient.connect());
    const apolloServer = new ApolloServer<Context>({typeDefs: typeDefs, resolvers: resolvers});
    // @ts-ignore
    return startServerAndCreateNextHandler(apolloServer, {context: resolveContext}) ;
}

export default await startServer()