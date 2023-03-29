import React, {FC, useEffect, useState} from "react";
import {Flashcard} from "../cardset/Flashcard";

import type {Card} from "#types";
import { Section } from "./Section";


const FlashcardSection: FC<{ next: Function, previous: Function, currentCard: Card }> = ({
                                                                                             next,
                                                                                             previous,
                                                                                             currentCard
                                                                                         }) => {

    const [flipped, setFlipped] = useState(false)
    const [animation, setAnimation] = useState<string>()
    const goNext = async () => {
        if (flipped) {
            setFlipped(false)
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        next()
        setAnimation('animate-card_from_right')
    }

    const goBack = async () => {
        if (flipped) {
            setFlipped(false)
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        previous()
        setAnimation('animate-card_from_left')
    }

    useEffect(() =>  {
        if (!animation) setAnimation('animate-[pulse_750ms]')
    }, [currentCard])

    return (
        <Section>
            <div className={'sm:m-5 py-6 flex grow'}>
                <Flashcard onNext={goNext} onBack={goBack} currentCard={currentCard} animation={animation} onAnimationEnd={() => setAnimation(undefined)}
                           flipState={[flipped, setFlipped]}/>
            </div>
        </Section>
    )
}

export default FlashcardSection