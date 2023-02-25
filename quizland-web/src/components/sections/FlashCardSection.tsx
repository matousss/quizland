import {ExpandableSection} from "./Section";
import React, {FC, useState} from "react";
import {FlashCard} from "../cardset/FlashCard";

import type {Card} from "#types";


const FlashCardSection: FC<{ next: Function, previous: Function, currentCard: Card }> = ({
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

    return (
        <ExpandableSection>
            <div className={'sm:m-5 py-6 flex grow'}>
                <FlashCard onNext={goNext} onBack={goBack} currentCard={currentCard} className={animation}
                           flipState={[flipped, setFlipped]}/>
            </div>
        </ExpandableSection>
    )
}

export default FlashCardSection