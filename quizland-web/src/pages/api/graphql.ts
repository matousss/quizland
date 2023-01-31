// import getServer from "quizland-gql/src/apollo";

import getServer from "quizland-gql/src";

import {startServerAndCreateNextHandler} from "@as-integrations/next";

const startApolloServerAndCreateNextHandler = async () => {
    let {server, options} = await getServer()
    return startServerAndCreateNextHandler(server, options);
}
export default await startApolloServerAndCreateNextHandler();

