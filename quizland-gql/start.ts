import getServer, {Context} from "./src/apollo";
import {startStandaloneServer} from "@apollo/server/standalone";



async function start() {
    const {server, options} = await getServer();
    return await startStandaloneServer<Context>(server, {
        // @ts-ignore
        port: 4000,
        host: "localhost",
        ...options})
}

start().then(
    ({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    })






