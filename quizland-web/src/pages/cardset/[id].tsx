import apollo_client from "../../graphql";
import {gql} from "@apollo/client";
import React, {useEffect, useState} from "react";
import NavBar from "@components/navigation/NavBar";
import {CardSetDescriptionSection as DescriptionSection, TitleSection} from "@components/sections";
import FlashCardSection from "@components/sections/FlashCardSection";
import {SectionContainer} from "@components/sections";
import {useRouter} from "next/router";
import {cardsSetToQuery} from "../../../lib/encode";
import {ArrowDownTrayIcon, DocumentDuplicateIcon, ShareIcon} from "@heroicons/react/24/outline";
import {BoppyButton} from "@components/buttons/BoppyButton";

import type {CardSet} from "#types";
import type {NextPage} from "next";


interface Params {
    id: number
}

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

type Props = {
    cardSet: CardSet
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

const CardSet: NextPage<Props> = (props) => {
    const cardSet = props.cardSet
    const {name, cards, owner, modified, ...rest} = cardSet
    // rest: {description, termLng, definitionLng}

    const [index, setIndex] = useState(0)
    const [currentCard, setCard] = useState(cards[0])

    useEffect(() => {
        if (index === cards.length) return setIndex(0)
        if (index < 0) return setIndex(cards.length - 1)
        setCard(cards[index])
    }, [index])

    const router = useRouter()
    const duplicate = async () => {
        let {id, name, ...rest} = cardSet
        let params = cardsSetToQuery({id: "", name: 'Copy of ' + name,...rest})

        await router.push(`create?${params}`)
    }

    return (
        <>
            <NavBar/>
            <SectionContainer>
                <TitleSection title={name}/>

                <div>
                    <FlashCardSection next={() => setIndex(index + 1)} previous={() => setIndex(index - 1)}
                                      currentCard={currentCard}/>
                    <div className={'flex justify-end pr-8 pb-2 gap-2'}>
                        <BoppyButton onClick={duplicate}>
                            <DocumentDuplicateIcon className={'h-8 w-8'}/>
                        </BoppyButton>
                        <BoppyButton className={'cursor-no-drop hover:text-secondary'}>
                            <ArrowDownTrayIcon className={'h-8 w-8'}/>
                        </BoppyButton>
                        <BoppyButton onClick={() => navigator.clipboard.writeText(`${window.location}`)}>
                            <ShareIcon className={'h-8 w-8'}/>
                        </BoppyButton>
                    </div>
                </div>

                <DescriptionSection author={owner} modified={modified ? Date.parse(modified) : undefined} {...rest}/>
            </SectionContainer>
        </>
    )

}

export default CardSet