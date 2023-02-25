import {Section, SectionContainer} from "../../components/sections";
import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {TCard} from "../../components/cardset/FlipCard";
import FlashCardSection from "../../components/sections/FlashCardSection";


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


    useEffect(() => {
        if (index === cards.length) return setIndex(0)
        if (index < 0) return setIndex(cards.length - 1)
        setCard(cards[index])
    }, [index])

    const cardRef = useRef(null)

    return (
        <SectionContainer>
            <FlashCardSection next={() => setIndex(index + 1)} previous={() => setIndex(index - 1)} currentCard={currentCard}/>
        </SectionContainer>
    )
}