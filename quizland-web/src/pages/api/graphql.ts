import type { NextApiRequest, NextApiResponse } from "next/types";
import getServer from "quizland-gql/src";

/*
import {startServerAndCreateNextHandler} from "@as-integrations/next";

const startApolloServerAndCreateNextHandler = async () => {
    let {server, options} = await getServer()
    return startServerAndCreateNextHandler(server, options);
}
export default await startApolloServerAndCreateNextHandler();

*/

export default await getServer<{req: NextApiRequest, res: NextApiResponse}>("/api/graphql");