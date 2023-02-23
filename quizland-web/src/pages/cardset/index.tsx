import {Section, SectionContainer} from "../../components/sections";
import {createRef, FC, Key, MutableRefObject, useEffect, useRef, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";


type TCard = [string, Array<string>]
const Card: FC<{ card: TCard }> = ({card}) => {
    const [flipped, setFipped] = useState(false)
    let definition = card[1].map((d, i) => (<div key={i}>{d}</div>))
    let term = <div>{card[0]}</div>

    return (
        <div className={'bg-gray-600 relative rounded-lg h-[18rem] cursor-pointer'} onClick={() => setFipped(!flipped)}>
            <div className={'font-sans uppercase animate-card bg-gray-600 absolute z-10 w-full h-full text-[4.5rem] rounded-lg text-gray-500 stroke-2 stroke-green-700 flex drop-shadow-lg'}

            >
                <style>
                    {/*todo replace*/}
                    {
                        '#a {\n' +
                        '                    -webkit-text-stroke-width: 1px;\n' +
                        '                    -webkit-text-stroke-color: green;\n' +
                        '                }'}
                </style>
                <div className={'m-auto'} id={'a'}>
                    Known!
                </div>
            </div>
            {flipped ? definition : term}

        </div>
    )
}

const CardBtn: FC<{ onClick: () => void, flipped?: boolean }> = ({onClick, flipped}) => (

    <div onClick={onClick}
         className={(flipped ? 'mr-auto ml-3' : 'ml-auto mr-3') + ' flex w-8 text-gray-500 hover:text-gray-300 duration-250 transition-all cursor-pointer'}>
        {flipped ? <ChevronRightIcon className={'my-auto'}/> : <ChevronLeftIcon className={'my-auto'}/>}
    </div>


)
export default function Temp() {
    const title = "Slova 1";
    const description = "Tohle je  sada na učení kokotů"
    const cards: Array<TCard> = [
        ["ahoj", ["pozdrav", "námořnický pozdrav"]],
        ["píča", ["ženské pohlavní ústrojí", "nadávka"]]
    ]

    const [index, setIndex] = useState(0)
    const [currentCard, setCard] = useState(cards[0])

    useEffect(() => {
        if (index === cards.length) return setIndex(0)
        if (index < 0) return setIndex(cards.length - 1)

        setCard(cards[index])
    }, [index])

    return (
        <SectionContainer>
            <Section>
                <div className={'m-5 mt-12 flex grow'}>
                    <CardBtn onClick={() => setIndex(index - 1)}/>
                    <div className={'w-full sm:w-2/3 md:w-1/3'}>
                        <Card card={currentCard}/>
                    </div>
                    <CardBtn onClick={() => setIndex(index + 1)} flipped={true}/>
                </div>

            </Section>
        </SectionContainer>
    )
}