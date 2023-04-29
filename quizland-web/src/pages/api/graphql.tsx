import type {NextApiRequest, NextApiResponse} from "next/types";


/*
import {startServerAndCreateNextHandler} from "@as-integrations/next";

const startApolloServerAndCreateNextHandler = async () => {
    let {server, options} = await getServer()
    return startServerAndCreateNextHandler(server, options);
}
export default await startApolloServerAndCreateNextHandler();

*/

const createPage = async () => {
    // to enable transpiling uncomment option in next.config.js and code below
    if (process.env.NODE_ENV == 'development')
        console.log('warning development api transpiling is disabled, open /src/pages/api/graphql for more info')
    /*
    if (process.env.NODE_ENV == 'development') {
            const getServer = (await import("quizland-gql/src")).default;
            return await getServer<{req: NextApiRequest, res: NextApiResponse}>("/api/graphql");
        }
        */
    return (req: NextApiRequest,
            res: NextApiResponse) => {
        return res.status(404).json({message: "In production API is independent"})
    }
}

export default await createPage()