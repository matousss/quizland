import {Section, SectionContainer} from "../../components/sections";
import {
    FC,
    useEffect,
    useRef,
    useState,
    PropsWithChildren, Dispatch, SetStateAction
} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Transition} from "@headlessui/react";
import styles from 'src/styles/Card.module.css'
import {wait} from "@apollo/client/testing";

type TCard = [Array<string>, Array<string>]


const AnimationCard: FC<{ success: boolean, onAnimationEnd: () => void }> = ({success, ...props}) => (
    <div
        className={'opacity-0 font-sans uppercase bg-gray-600 absolute z-10 w-full h-full text-[4rem] rounded-lg text-gray-500 flex drop-shadow-lg border-[3.5px] '
            + (success ? 'border-green-800 text-green-700 animate-card_result_r ' + styles.strokeGreen : 'border-red-800 text-red-700 animate-card_result_l ' + styles.strokeRed)}
        {...props}
    >
        <div className={'m-auto'}>
            {success ? '✓' : '✗'}
        </div>
    </div>
)

const CardFace: FC<{ show: boolean } & PropsWithChildren> = ({children, show}) => (
    <Transition
        show={show}

        enterFrom={styles.flip}

        leaveTo={styles.flip}

        className={'flex py-6 bg-gray-600 absolute z-10 w-full h-full rounded-lg transition-transform duration-500 backface-hidden font-sans text-lg md:text-[1.3rem] text-gray-200'}
    >
        <div
            className={'px-4 sm:px-6 md:px-8 m-auto divide-y divide-gray-500 overflow-y-auto max-h-full w-full scrollbar scrollbar-thumb-gray-500 scrollbar-thin scrollbar-w-[5px] scrollbar-rounded'}>
            {children}
        </div>

    </Transition>
)

const arrayToTerms = (array: Array<String>) => array.map((d, i) => (
    <div key={i} className={'text-center p-1 sm:p-6'}>{d}</div>))
const FlipCard: FC<{
    card: TCard,
    className?: string,
    flipState?: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({
          card,
          className = '',
          flipState
      }) => {

    const [flipped, setFlipped] = flipState || useState(false)

    let definition = arrayToTerms(card[1])
    let term = arrayToTerms(card[0])
    let cardRef = useRef<HTMLDivElement>(null)

    return (
        <div className={'w-[15rem] sm:w-[21rem] md:w-[27rem] z-0 select-none'}>
            <div ref={cardRef} key={card[0][0]}
                 className={className + ' relative rounded-lg h-[10rem] sm:h-[14rem] md:h-[18rem] cursor-pointer backdrop-shadow-lg'}
            >
                <div onClick={() => setFlipped(!flipped)}>

                    <CardFace show={!flipped}>
                        {term}
                    </CardFace>
                    <CardFace show={flipped}>
                        {definition}
                    </CardFace></div>

                {/*AnimationCard placeholder*/}
            </div>
        </div>
    )
}

const CardBtn: FC<{ onClick: () => void, flipped?: boolean }> = ({onClick, flipped}) => (

    <div onClick={onClick}
         className={(flipped ? 'mr-auto ml-3' : 'ml-auto mr-3') + ' z-10 flex w-8 text-gray-500 hover:text-gray-300 duration-250 transition-all cursor-pointer'}>
        {flipped ? <ChevronRightIcon className={'my-auto'}/> : <ChevronLeftIcon className={'my-auto'}/>}
    </div>


)
export default function Temp() {
    const title = "Slova 1";
    const description = "Tohle je  sada na učení kokotů"
    const cards: Array<TCard> = [
        [["ahoj"], ["pozdrav", "námořnický pozdrav", "pozdrav hovad", "nevim", "černá hra"]],
        [["píča"], ["ženské pohlavní ústrojí", "nadávka"]],
        [["zapnout svělo"], ["to turn the light on", "to flip the light on", "to flick the light on", "to switch on the light", "to snap the light on"]],
    ]

    const [index, setIndex] = useState(0)
    const [currentCard, setCard] = useState(cards[0])
    const [animation, setAnimation] = useState<string>()

    useEffect(() => {
        if (index === cards.length) return setIndex(0)
        if (index < 0) return setIndex(cards.length - 1)
        setCard(cards[index])
    }, [index])

    const moveR = async () => {
        setIndex(index + 1)
        if (flipped) {
            setFlipped(false)
            await wait(500)
        }
        setAnimation('animate-card_from_right')
    }

    const moveL = async () => {
        if (flipped) {
            setFlipped(false)
            await wait(500)
        }
        setIndex(index - 1)
        setAnimation('animate-card_from_left')
    }

    const [flipped, setFlipped] = useState(false)

    const cardRef = useRef(null)

    return (
        <SectionContainer>
            <Section>
                <div className={'sm:m-5 mt-12 flex grow'}>
                    <CardBtn onClick={moveR}/>

                    <FlipCard card={currentCard} className={animation} flipState={[flipped, setFlipped]}/>

                    <CardBtn onClick={moveL} flipped={true}/>
                </div>

            </Section>
        </SectionContainer>
    )
}