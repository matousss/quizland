import React, {Dispatch, FC, MouseEventHandler, SetStateAction} from "react";
import {FlipCard} from "./FlipCard";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

import type {Card} from "#types";

const CardBtn: FC<{ onClick: MouseEventHandler, flipped?: boolean }> = ({onClick, flipped}) => (
    <div onClick={onClick}
         className={(flipped ? 'mr-auto ml-3' : 'ml-auto mr-3') + ' z-10 flex w-8 text-gray-500 hover:text-white duration-250 transition-all cursor-pointer'}>
        {flipped ? <ChevronRightIcon className={'my-auto'}/> : <ChevronLeftIcon className={'my-auto'}/>}
    </div>
)

export const FlashCard: FC<{ onNext: MouseEventHandler, onBack: MouseEventHandler, currentCard: Card, className?: string, flipState?: [boolean, Dispatch<SetStateAction<boolean>>] }> = ({
                                                                                                                                                                                             onNext,
                                                                                                                                                                                             onBack,
                                                                                                                                                                                             currentCard,
                                                                                                                                                                                             className,
                                                                                                                                                                                             flipState
                                                                                                                                                                                         }) => (
    <>
        <CardBtn onClick={onBack}/>
        <FlipCard card={currentCard} className={className} flipState={flipState}/>
        <CardBtn onClick={onNext} flipped={true}/>
    </>
)