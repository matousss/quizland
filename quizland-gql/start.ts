import getServer from "./src/yoga";
import {createServer} from "http";


const endpoint = '';
const port = 4000

async function start() {
    const yoga = await getServer(endpoint);
    createServer(yoga).listen({port: port});
}

start().then(
    () => console.log(`🚀 Server ready at http://localhost:${port}${endpoint}`)
)






