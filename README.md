# QuizLand

## Build on

- Next.js
- ApolloClient
- Yoga
- MongoDB
- Graphql

## API

Api is using Graphql and is maintained by ~~ApolloServer~~ Yoga server.
The api endpoint is hosted on `/api/graphql`.

API server can be started without Next.js by following code:

```typescript
import getServer from "./src/yoga";
import {createServer} from "http";

const yogaServer = await getServer('api/graphql');
createServer(yogaServer).listen({port: 3000});
```