import {getStaticPaths as getPaths, getStaticProps as getProps} from "./util";
import {NextPage} from "next";
import {Card} from "#types";
import {Props, Params} from "./util";
import NavBar from "@components/navigation/NavBar";
import {Section, TitleSection} from "@components/sections";
import React, {useEffect, useState} from "react";
import {AnimationCard, FlipCard} from "@components/cardset/FlipCard";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {random} from "nanoid";
import ResultBoard from "@components/cardset/ResultBoard";
import {shuffleArray} from "@lib/util";

enum Type {
    FlashCard = 'flashcard',
    Match = 'multiplechoice',
    Learn = 'learn',
}

export const getStaticPaths = async () => {
    let {paths} = await getPaths();
    let topPaths = paths.map(
        (p) => Object.values(Type).map((t) => ({params: {...p.params, type: t}}))
    ).flat(1);

    return {
        paths: topPaths,
        fallback: false,
    }
}
export const getStaticProps = async ({params}: { params: Params & { type: Type } }) => {
    console.log({params})
    let props = await getProps({params});

    return {...props, props: {...props.props, type: params.type}}
}

const FlashCard = (props: Props) => {
    const [cards, setCards] = useState(props.cardSet.cards as Card[]);
    const [currentI, setCurrentI] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [animation, setAnimation] = useState<string>()
    const [animationFace, setAnimationFace] = useState<JSX.Element | null>(null)
    const [knownN, setKnown] = useState<number>(0)
    const [showResult, setShowResult] = useState<boolean>(false)
    const [unknown, setUnknown] = useState<Card[]>([])
    useEffect(() => {
        if (!animation) setAnimation('')
    }, [currentI])


    const next = (known: boolean) => {
        setFlipped(false)
        setAnimationFace(<AnimationCard key={random(1)} onAnimationEnd={() => setAnimationFace(null)} success={known} />)
        if (known) setKnown(knownN + 1)
        else setUnknown([...unknown, cards[currentI]])
        if (currentI === cards.length - 1) {
            setShowResult(true)
            return
        }

        setCurrentI(currentI + 1)

    }

    const reset = () => {
        setCurrentI(0)
        setKnown(0)
        setShowResult(false)
    }
    const restart = () => {
        reset()
        setCards(shuffleArray(props.cardSet.cards) as Card[])
        setUnknown([])
    }

    const restartMissed = () => {
        reset()
        setCards(shuffleArray(unknown))
        setUnknown([])

    }

    return (<>
        <NavBar/>
        <ResultBoard show={showResult} restart={restart} restartMissed={restartMissed} result={{learning: cards.length - knownN, known: knownN}}/>
        <div className={'divide-y divide-secondary divide-dashed w-full text-lg'}>
            <TitleSection title={props.cardSet.name}/>
            <Section>
                <div className={'w-full text-center display-1'}>
                    {currentI + 1} / {cards.length}
                </div>
                <div className={'sm:m-5 flex grow'}>
                    <div className={'w-[6rem] ml-auto py-4 my-auto bg-middle rounded-l-[95%] text-secondary' +
                        ' duration-500 translate-x-[20%] hover:translate-x-[5%] hover:text-red-600 cursor-pointer'}
                        onClick={() => next(false)}
                    >
                        <XMarkIcon className={'py-4 pr-2 pl-4'}/>
                    </div>
                    <div className={'relative z-10'}>
                        <div className={'absolute w-full h-full bg-primary rounded-lg top-0 flex'}>
                            <div className={'bg-middle h-[7rem] w-full my-auto'}/>
                        </div>

                        <FlipCard card={cards[currentI]} animation={animation} flipState={[flipped, setFlipped]}/>
                        {animationFace}
                    </div>
                    <div className={'w-[6rem] h-full mr-auto py-4 my-auto bg-middle rounded-r-[95%] text-secondary' +
                        ' duration-500 translate-x-[-20%] hover:translate-x-[-5%] hover:text-green-600 cursor-pointer'}
                         onClick={() => next(true)}
                    >
                        <CheckIcon className={'py-4 pl-2 pr-4'}/>
                    </div>
                </div>
            </Section>
        </div>


    </>)
}

const cardset: NextPage<{ type: Type } & Props> = (props) => {
    switch (props.type) {
        case Type.FlashCard:
            return <FlashCard {...props}/>
        case Type.Match:
            return <div>Match</div>
        case Type.Learn:
            return <div>Learn</div>
    }
}

export default cardset