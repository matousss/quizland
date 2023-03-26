import React, {useEffect, useState} from "react";
import NavBar from "@components/navigation/NavBar";
import {CardSetDescriptionSection as DescriptionSection, TitleSection} from "@components/sections";
import FlashCardSection from "@components/sections/FlashCardSection";
import {SectionContainer} from "@components/sections";
import {useRouter} from "next/router";

import {
    ArrowDownTrayIcon,
    DocumentDuplicateIcon,
    PencilIcon,
    ShareIcon
} from "@heroicons/react/24/outline";
import {BoppyButton} from "@components/buttons/BoppyButton";
import ShuffleIcon from "@components/utility/ShuffleIcon";
import {cardsSetToQuery} from "@lib/encode";
import {useUser} from "@lib/hooks/user";
import {CardSetPage, getStaticPaths as getPaths, getStaticProps as getProps} from "./util";
import {shuffleArray} from "@lib/util";

export const getStaticPaths = getPaths
export const getStaticProps = getProps

const CardSet: CardSetPage = (props) => {
    const cardSet = props.cardSet
    const {name, cards, owner, modified, ...rest} = cardSet
    // rest: {description, termLng, definitionLng}

    const [index, setIndex] = useState(0)
    const [currentCard, setCard] = useState(cards[0])
    const [shuffled, setShuffled] = useState<typeof cards | null>(null)
    const user = useUser()

    useEffect(() => {
        if (index === cards.length) return setIndex(0)
        if (index < 0) return setIndex(cards.length - 1)

        let useCards = shuffled ?? cards

        setCard(useCards[index])
    }, [index, shuffled])

    const router = useRouter()
    const duplicate = async () => {
        let {id, name, ...rest} = cardSet
        let params = cardsSetToQuery({id: "", name: 'Copy of ' + name, ...rest})

        await router.push(`create?${params}`)
    }

    const shuffle = () => {
        if (shuffled !== null) {
            setShuffled(null)
            return
        }

        setShuffled(shuffleArray(cards))
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
                        <BoppyButton onClick={shuffle}>
                            <ShuffleIcon className={'h-8 w-8' + (shuffled ? ' text-contrast' : '')}/>
                        </BoppyButton>
                        {owner && user && owner.id == user.id ? <BoppyButton onClick={() => window.location.href = ('/cardset/edit/' +   cardSet.id)}>
                            <PencilIcon className={'h-8 w-8'}/>
                        </BoppyButton> : ''}
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