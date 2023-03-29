import {getStaticPaths as getPaths, getStaticProps as getProps} from "./util";
import {NextPage} from "next";
import {Card} from "#types";
import {Props, Params} from "./util";
import NavBar from "@components/navigation/NavBar";
import {Section, TitleSection} from "@components/sections";
import React, {ReactNode, useEffect, useState} from "react";
import {AnimationCard, FlipCard} from "@components/cardset/FlipCard";
import {ArrowLeftIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import ResultBoard from "@components/cardset/ResultBoard";
import {shuffleArray} from "@lib/util";
import OptionsModal from "@components/cardset/OptionsModal";
import {RadioGroup} from "@headlessui/react";

enum Type {
    FlashCard = 'flashcard',
    Match = 'match',
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
    let props = await getProps({params});

    return {...props, props: {...props.props, type: params.type}}
}

const GoBackBtn = ({id}: { id: string }) =>
    <a href={`/cardset/${id}`}
       className={'hover:text-white text-secondary drop-shadow-xl duration-500 fixed left-0 bottom-0 z-50'}>
        <ArrowLeftIcon className={'w-20 p-4'}/>
    </a>

/*
*
*
*
*
*
*
*
* ----------------------------------------------------------------------------------------
*
* FlashCard mode
*
* ----------------------------------------------------------------------------------------
*
*
*
*
*
*
*
* */


const FlashCard = ({cardSet}: Props) => {
    const [cards, setCards] = useState(cardSet.cards as Card[]);
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
        setAnimationFace(<AnimationCard key={Math.random()} onAnimationEnd={() => setAnimationFace(null)}
                                        success={known}/>)
        if (known) setKnown(knownN + 1)
        else setUnknown([...unknown, cards[currentI]])
        if (currentI >= cards.length - 1) {
            console.log('amfjkdzhujfbghj')
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
        setCards(shuffleArray(cardSet.cards) as Card[])
        setUnknown([])
    }

    const restartMissed = () => {
        reset()
        setCards(shuffleArray(unknown))
        setUnknown([])

    }

    return (<>
        <ResultBoard show={showResult} restart={restart} restartMissed={restartMissed}
                     fail={{title: 'Learning', value: cards.length - knownN}}
                     success={{title: 'Known', value: knownN}}/>
        <div className={'divide-y divide-secondary divide-dashed w-full text-lg'}>
            <TitleSection title={cardSet.name}/>
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

/*
*
*
*
*
*
*
*
* ----------------------------------------------------------------------------------------
*
* Match mode
*
* ----------------------------------------------------------------------------------------
*
*
*
*
*
*
*
* */
const Option = ({children, ...props}: { value: string, children: ReactNode }) => (
    <RadioGroup.Option {...props}>
        {({checked}) => (
            <div
                className={`${
                    checked ? 'bg-primary text-white' : 'bg-middle_dark '
                } relative ring-0 border-0 outline-none rounded-lg shadow-md px-5 py-4 cursor-pointer flex items-center justify-between `}
            >
                <div className="flex items-center flex-1">
                    <div className="text-sm">
                        <RadioGroup.Label as="p" className="font-medium text-white">
                            {children}
                        </RadioGroup.Label>
                    </div>
                </div>
                {checked && (
                    <CheckCircleIcon className="h-5 text-contrast" aria-hidden="true"/>
                )}
            </div>
        )
        }
    </RadioGroup.Option>
)

enum AnswerWith {
    TERM= 'Term',
    DEFINITION = 'Definition'
}

const Match = ({cardSet}: Props) => {
    const [cards, setCards] = useState(cardSet.cards as Card[]);
    const [answerWith, setAnswerWith] = useState<AnswerWith>(AnswerWith.TERM)
    const [started, setStarted] = useState<boolean>(false)
    const [currentI, setCurrentI] = useState(0);
    useEffect(() => console.log(started), [started])
    return (
        <>
            <OptionsModal show={!started} onConfirm={() => setStarted(true)}>
                <div className={'flex mb-auto'}>
                    <RadioGroup value={answerWith} onChange={setAnswerWith} as={'div'} className={'flex gap-3 flex-col w-1/3 mb-auto mx-auto'}>
                        <RadioGroup.Label className={'text-xl'}>
                            Answer with:
                        </RadioGroup.Label>
                        {Object.values(AnswerWith).map(
                            (value, i) => <Option value={value} key={i}>{value}</Option>
                        )}
                    </RadioGroup>
                </div>
                <div className={'text-xl mt-auto mx-auto'}>
                    More coming soon...
                </div>

            </OptionsModal>
            <div className={'divide-y divide-secondary divide-dashed w-full text-lg'}>
                <TitleSection title={cardSet.name}/>
                <Section>
                    <div className={'w-full text-center display-1'}>
                        {currentI + 1} / {cards.length}
                    </div>
                </Section>
            </div>
        </>
    )
}

const cardset: NextPage<{ type: Type } & Props> = (props) => {
    const C = (() => {
        switch (props.type) {
            case Type.FlashCard:
                return FlashCard
            case Type.Match:
                return Match
            case Type.Learn:
                return () => <div/>
        }
    })()

    return <>
        <NavBar/>
        <C {...props}/>
        <GoBackBtn id={props.cardSet.id}/>
    </>
}

export default cardset