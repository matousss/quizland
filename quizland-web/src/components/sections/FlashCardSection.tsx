import {TCard} from "../cardset/FlipCard";
import {Section} from "./Section";
import React, {FC, useState} from "react";
import {FlashCard} from "../cardset/FlashCard";



const FlashCardSection: FC<{next: Function, previous: Function, currentCard: TCard}> = ({next, previous, currentCard}) => {

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
        <Section>
            <div className={'sm:m-5 mt-12 flex grow'}>
                <FlashCard onNext={goNext} onBack={goBack} currentCard={currentCard} className={animation} flipState={[flipped, setFlipped]}/>
            </div>
        </Section>
    )
}

export default FlashCardSection