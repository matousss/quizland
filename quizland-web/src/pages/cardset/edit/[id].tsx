import {GetServerSideProps, NextPage} from "next";
import {CardSet} from "#types";
import Editor from "@components/cardset/Editor";

import {gql} from "@apollo/client";
import apolloClient from "src/graphql";
import {MetaType} from "@components/sections/create/MetaSection";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    let id = req.url?.split('/')[3];
    let response;
    try {
        response = await apolloClient.query({
            query: gql`
                query ($id: ID!) {
                    cardSet: getCardSet(id: $id) {
                        id
                        name
                        description
                        permissions {
                            user
                            group
                            permission
                        }
                        cards {
                            term
                            definition
                        }
                    }
                }
            `,
            variables: {
                id: id
            }

        });

    } catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }



    return {
        props: {
            cardSet: response.data.cardSet
        }
    }
}
const Edit: NextPage<{ cardSet: Omit<CardSet, 'termLng' | 'definitionLng' | 'modified' | 'owner'> }> = ({cardSet}) => {
    let {permissions, cards, id, description, name} = cardSet;
    let meta : MetaType = {
        name: name,
        description: description ? description : '',
        isPrivate: !!permissions
    };

    return (
        <Editor initialTerms={cards.map(({definition, term}) =>({definition: definition, term: term}))} initialMeta={meta} id={id}/>
    )
}

export default Edit;