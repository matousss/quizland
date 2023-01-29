import {NextApiRequest, NextApiResponse} from "next";
import apolloClient from "src/apollo_client";
import {gql} from "@apollo/client";

const Google = async (req: NextApiRequest, res: NextApiResponse) => {
    /*console.log({req})/*
    console.log(res)*/

    if (!req.body.credential) {
        return res.status(400).json({error: "No credential provided"})
    }

    console.log(req.body.credential)
    let {data} = await apolloClient.query({
        query: gql`query Query($provider: ProviderType!, $code: String!) {
            authenticateUser(provider: $provider, code: $code) {
                expires
                token
            }
        }`,
        variables: {
            provider: "GOOGLE",
            code: req.body.credential
        }
    })



    return res.status(200).json({data: data})
}

export default Google