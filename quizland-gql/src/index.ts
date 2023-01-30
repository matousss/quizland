import getServer, {Context} from "./apollo";

import  {startStandaloneServer} from "@apollo/server/standalone";

getServer().then(
    ({server, options}) => {
        // @ts-ignore
        startStandaloneServer<Context>(server, options).then(
            ({url}) => {
                console.log(`🚀 Server ready at ${url}`);
            }
        )
    }
)





