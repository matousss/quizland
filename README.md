# QuizLand

## Build on

- Next.js
- NextAuth
- ApolloServer
- ApolloClient
- MongoDB
- Graphql

## API

Api is using Graphql and is maintained by ApolloServer.
The server is hosted on `/api/graphql`.

API server can be started without Next.js by following code:

```typescript
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
```

### Packages

- Graphql