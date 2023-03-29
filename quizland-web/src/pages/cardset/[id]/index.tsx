import React, {useEffect, useState} from "react";
import NavBar from "@components/navigation/NavBar";
import {CardSetDescriptionSection as DescriptionSection, Section, TitleSection} from "@components/sections";
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

const ModeBtn = ({
                     children,
                     href,
                     disabled = false
                 }: { children: React.ReactNode, href: string, disabled?: boolean }) => (
    <a href={href} className={(disabled ? ' pointer-events-none cursor-not-allowed' : '')}>
        <div className={'font-semibold text-xl rounded-lg p-4 flex bg-secondary hover:scale-[1.05] duration-200 '}>
            {children}
        </div>
    </a>
)

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
                {/* just top buttons */}
                <Section className={'grid grid-cols-3 gap-4'}>
                    <ModeBtn href={`/cardset/${cardSet.id}/flashcard`}>
                        <svg viewBox={'0 0 180 180'} className={'h-7 mr-2'}>
                            <path
                                d="m 97.49881,24.054526 25.52573,106.594324 c 1.61527,6.7453 -3.3757,13.63401 -11.14736,15.38606 l -48.894131,11.02366 c -7.771427,1.75303 -15.382593,-2.29579 -16.997863,-9.04109 L 20.459456,41.423157 c -1.61527,-6.745295 3.376672,-13.63424 11.148332,-15.386293 L 80.501921,15.013205 c 7.771427,-1.753025 15.381621,2.296027 16.996889,9.041321 z"
                                opacity="1"
                                fill={'currentColor'}
                                className={'text-gray-400'}
                            />
                            <path
                                d="M 173.70338,56.842302 143.52075,162.31464 c -1.91018,6.67507 -9.71152,10.48164 -17.4239,8.50345 L 77.576682,158.37176 C 69.8643,156.39357 65.160709,149.37879 67.070887,142.70373 L 97.25325,37.232351 c 1.91018,-6.675063 9.71055,-10.481911 17.42293,-8.503718 l 48.52017,12.446327 c 7.71238,1.978193 12.41694,8.993241 10.50703,15.667342"
                                opacity="1"
                                strokeWidth="10px"
                                fill={'currentColor'}
                            />
                        </svg>
                        FlashCard
                    </ModeBtn>
                    <ModeBtn href={'/cardset/' + cardSet.id + '/match'} disabled={true}>
                        <svg className={"h-7 mr-2"} viewBox={'0 0 32 32'}>
                            <path fill={'currentColor'}
                                  d="M24,17c-0.665,0-1.302,0.113-1.9,0.312l-2.068-3.878C21.238,12.337,22,10.759,22,9  c0-3.314-2.686-6-6-6s-6,2.686-6,6c0,1.759,0.762,3.337,1.968,4.434L9.9,17.312C9.302,17.113,8.665,17,8,17c-3.314,0-6,2.686-6,6  s2.686,6,6,6c2.972,0,5.433-2.163,5.91-5h4.18c0.477,2.837,2.938,5,5.91,5c3.314,0,6-2.686,6-6S27.314,17,24,17z M13.654,14.523  C14.375,14.83,15.167,15,16,15s1.625-0.17,2.346-0.477l1.991,3.732c-1.168,0.903-1.991,2.226-2.247,3.744h-4.18  c-0.255-1.518-1.078-2.841-2.247-3.744L13.654,14.523z"/>
                        </svg>
                        Match
                    </ModeBtn>
                    <ModeBtn href={'/cardset/' + cardSet.id + '/learn'} disabled={true}>
                        <svg viewBox={'0 0 16 16'} className={'w-7 mr-2'}>
                            <path fill="currentColor" fillRule={'evenodd'}
                                  d="M8.316 2.07a.75.75 0 00-.632 0l-7 3.25a.75.75 0 000 1.36l1.434.666A.746.746 0 002 7.75V11a.75.75 0 00.158.46L2.75 11l-.592.46.001.002.001.001.003.004.008.01a1.882 1.882 0 00.103.12c.068.076.165.178.292.299.254.24.63.555 1.132.866C4.706 13.388 6.217 14 8.25 14c2.037 0 3.44-.615 4.345-1.266a5.32 5.32 0 00.977-.902 3.916 3.916 0 00.322-.448l.007-.012.003-.004v-.002h.001c0-.001 0-.002-.655-.366l.655.365A.754.754 0 0014 11V7.75a.747.747 0 00-.118-.404l1.434-.666a.75.75 0 000-1.36l-7-3.25zM12.5 7.988L8.316 9.93a.75.75 0 01-.632 0L3.5 7.988v2.723a5.585 5.585 0 00.99.776c.804.5 2.043 1.013 3.76 1.013 1.713 0 2.81-.51 3.468-.984a3.812 3.812 0 00.782-.745V7.988zM8 8.423L2.781 6 8 3.577 13.219 6 8 8.423z"
                                  />
                        </svg>
                        Learn
                    </ModeBtn>
                </Section>
                {/* main section */}
                <div>
                    <FlashCardSection next={() => setIndex(index + 1)} previous={() => setIndex(index - 1)}
                                      currentCard={currentCard}/>
                    <div className={'flex justify-end pr-8 pb-2 gap-2'}>
                        <BoppyButton onClick={shuffle}>
                            <ShuffleIcon className={'h-8 w-8' + (shuffled ? ' text-contrast' : '')}/>
                        </BoppyButton>
                        {owner && user && owner.id == user.id ?
                            <BoppyButton onClick={() => window.location.href = ('/cardset/edit/' + cardSet.id)}>
                                <PencilIcon className={'h-8 w-8'}/>
                            </BoppyButton> : ''}
                        <BoppyButton onClick={duplicate}>
                            <DocumentDuplicateIcon className={'h-8 w-8'}/>
                        </BoppyButton>
                        <BoppyButton className={'cursor-not-allowed hover:text-secondary'}>
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