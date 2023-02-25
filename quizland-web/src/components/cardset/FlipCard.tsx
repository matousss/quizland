import {ElementType, useRef, useState} from "react";
import styles from "../../styles/Card.module.css";
import {Transition} from "@headlessui/react";

import type {Dispatch, FC, PropsWithChildren, SetStateAction} from "react";

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

        className={'flex py-6 bg-gray-600 absolute z-10 w-full h-full rounded-lg transition-transform duration-500 backface-hidden font-sans'}
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
    flipState?: [boolean, Dispatch<SetStateAction<boolean>>],
    AdditionalFace?: ElementType
}> = ({
          card,
          className = '',
          flipState,
          AdditionalFace
      }) => {

    const [flipped, setFlipped] = flipState || useState(false)

    let definition = arrayToTerms(card[1])
    let term = arrayToTerms(card[0])
    let cardRef = useRef<HTMLDivElement>(null)
    let additionalFace = AdditionalFace ? <AdditionalFace onClick={() => setFlipped(!flipped)}/> : null

    return (
        <div className={'w-[18rem] sm:w-[33rem] md:w-[39rem] z-0 select-none'}>
            <div ref={cardRef} key={card[0][0]}
                 className={className + ' relative rounded-lg h-[12rem] sm:h-[22rem] md:h-[26rem] cursor-pointer backdrop-shadow-lg'}
            >
                <div onClick={() => setFlipped(!flipped)}
                     className={'text-[1.3rem] sm:text-[2.2rem] md:text-[2.4rem] text-gray-200'}>

                    <CardFace show={!flipped}>
                        {term}
                    </CardFace>
                    <CardFace show={flipped}>
                        {definition}
                    </CardFace>
                </div>
                {additionalFace}
                {/*AnimationCard placeholder*/}

            </div>
        </div>
    )
}

export {FlipCard, AnimationCard}
export type {TCard}