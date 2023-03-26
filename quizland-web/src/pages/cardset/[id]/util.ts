import apollo_client from "@/graphql";
import {gql} from "@apollo/client";
import {CardSet} from "#types";
import {NextPage} from "next";

export const getStaticPaths = async () => {
    const {data} = await apollo_client.query<{ idList: number[] }>({
        query: gql`
            query {
                idList: discoverCardSets
            }
        `
    });
    const paths = data.idList.map((id) => {
        return {
            params: {
                id: id.toString()
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}


export type Props = {
    cardSet: CardSet
}

export type CardSetPage = NextPage<Props>;

export interface Params {
    id: number
}

export const getStaticProps = async ({params}: { params: Params }): Promise<{ props: Props } & any> => {
    const {data} = await apollo_client.query<{ cardSet: CardSet }>(
        {
            query: gql`
                query ($id: ID!) {
                    cardSet: getCardSet(id: $id) {
                        id
                        name
                        description
                        owner {
                            id
                            username
                            surname
                            lastname
                            image
                        }
                        cards {
                            term
                            definition
                        }
                        termLng
                        definitionLng
                        modified
                    }
                }
            `,
            variables: {
                id: params.id
            }
        }
    )

    return {
        props: {
            cardSet: data.cardSet
        },
        revalidate: 60 * 60 * 24
    }
}