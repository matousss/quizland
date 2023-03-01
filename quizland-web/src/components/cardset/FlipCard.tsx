import {AnimationEventHandler, ComponentProps, ElementType, useRef, useState} from "react";
import styles from "../../styles/Card.module.css";
import {Transition} from "@headlessui/react";

import type {Dispatch, FC, PropsWithChildren, SetStateAction} from "react";
import type {Card} from "#types";


/**
 * Face of a flip card used for Known/Unknown card mode
 * */
const AnimationCard: FC<{ success: boolean } & ComponentProps<any>> = ({success, ...props}) => (
    <div
        className={'opacity-0 font-sans uppercase bg-secondary absolute z-10 w-full h-full text-[4rem] rounded-lg text-gray-500 flex drop-shadow-lg border-[3.5px] '
            + (success ? 'border-green-800 text-green-700 animate-card_result_r ' + styles.strokeGreen : 'border-red-800 text-red-700 animate-card_result_l ' + styles.strokeRed)}
        {...props}
    >
        <div className={'m-auto'}>
            {success ? '✓' : '✗'}
        </div>
    </div>
)

/**
 * Represents one side of a flip card
 * @param show Whether is shown or not, animation is played when this changes
 * @param children The content of the card
 * */
const CardFace: FC<{ show: boolean } & PropsWithChildren> = ({children, show}) => (
    <Transition
        show={show}

        enterFrom={styles.flip}

        leaveTo={styles.flip}

        className={'flex py-6 bg-secondary absolute z-10 w-full h-full rounded-lg transition-transform duration-500 backface-hidden font-sans'}
    >
        <div
            className={'px-4 sm:px-6 md:px-8 m-auto divide-y divide-gray-500 overflow-y-auto max-h-full w-full scrollbar scrollbar-thumb-gray-500 scrollbar-thin scrollbar-w-[5px] scrollbar-rounded'}>
            {children}
        </div>

    </Transition>
)

const arrayToTerms = (array: Array<String>) => array.map((d, i) => (
    <div key={i} className={'text-center p-1 sm:p-6'}>{d}</div>))

/**
 * Creates a flip card with a term and a definition, both can be a list of strings
 * @param {Card} card Card to be displayed in format {term: string, definition: string[]}
 * @param className Additional classes for the card
 * @param flipState State of the card, if not provided, the card will be flipped on click
 * @param AdditionalFace Additional face of the card, will be shown over card face, can be used for animations
 * */
const FlipCard: FC<{
    card: Card,
    animation?: string,
    onAnimationEnd?: AnimationEventHandler,
    flipState?: [boolean, Dispatch<SetStateAction<boolean>>],
    AdditionalFace?: ElementType
}> = ({
          card,
          animation = '',
          onAnimationEnd,
          flipState,
          AdditionalFace
      }) => {

    const [flipped, setFlipped] = flipState || useState(false)

    let {term, definition} = card

    let definitionComponents = arrayToTerms(definition as Array<string>)
    let termComponents = arrayToTerms([term as string])
    let cardRef = useRef<HTMLDivElement>(null)
    let additionalFace = AdditionalFace ? <AdditionalFace onClick={() => setFlipped(!flipped)}/> : null

    return (
        <div className={'w-[18rem] sm:w-[33rem] md:w-[39rem] z-0 select-none'}>
            <div ref={cardRef} key={term}
                 className={animation + ' relative rounded-lg h-[12rem] sm:h-[22rem] md:h-[26rem] cursor-pointer drop-shadow-xl'}
                 onAnimationEnd={onAnimationEnd}
            >
                <div onClick={() => setFlipped(!flipped)}
                     className={'text-[1.3rem] sm:text-[2.2rem] md:text-[2.4rem] text-gray-200'}>

                    <CardFace show={!flipped}>
                        {termComponents}
                    </CardFace>
                    <CardFace show={flipped}>
                        {definitionComponents}
                    </CardFace>
                </div>
                {additionalFace}
                {/*AnimationCard placeholder*/}

            </div>
        </div>
    )
}

export {FlipCard, AnimationCard}