import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Text} from "@components/forms/input";
import {Section} from "@components/sections";
import {PlusCircleIcon, PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";

import type {Card} from "#types";
const TermInput: FC<{
    setter: (value: string) => void,
    remove: () => void,
    index: number,
    value: string,
}> = ({
          setter,
          remove,
          index,
          value
      }) => (
    <div className={'relative'}>
        <Text key={index} placeholder={'Definition'} className={'w-full'} value={value}
              autoFocus={index !== 0}
              onChange={e => setter(e.target.value)}/>
        {index !== 0 && <div className={'absolute flex right-1 top-0 z-10 h-full'}>
            <button tabIndex={-1} className={'my-auto text-gray-400 hover:text-white duration-200'} onClick={remove}>
                <XMarkIcon className={'w-[1.1rem]'}/>
            </button>
        </div>}
    </div>
)

const Term: FC<{
    setter: (key: 'term' | 'definition', val: string | Array<string>) => void,
    remove: () => void
    term: string,
    definition: Array<string>,

}> = ({
          setter,
          remove,
          term,
          definition
      }) => {
    const [defs, setDefs] = useState(definition)

    useEffect(() => {
        setter('definition', defs)
    }, [defs])

    useEffect(() => setDefs(definition), [definition])

    const addDef = () => {
        setDefs([...defs, ''])
    }

    const delRef = (index: number) => {
        defs.splice(index, 1)
        setDefs([...defs])
    }

    return (
        <div className={'flex relative border-2 border-middle my-3 p-6 rounded-sm bg-middle'}>
            <button tabIndex={-1} className={'absolute top-[-.85rem] right-[-.85rem] text-gray-400 hover:text-white'}
                    onClick={remove}>
                <XMarkIcon className={'w-6'}/>
            </button>
            <span className={'w-1/3'}>
                <Text placeholder={'Term'} className={'w-full'}
                      onChange={e => setter('term', e.target.value)}
                      value={term}
                      autoFocus={true}
                />
            </span>
            <span className={'grow'}>

            </span>
            <span className={'w-1/3 relative'}>
                {defs.map((def, i) => def !== undefined &&
                    <TermInput value={def} key={i} index={i} setter={(val) => {
                        defs[i] = val
                        setDefs([...defs])
                    }}
                               remove={() => delRef(i)}
                    />
                )}
                <div className={'absolute flex w-full duration-200'}>
                    <button tabIndex={-1} className={'w-[1.1rem] mt-1 mx-auto text-gray-400 hover:text-white'}
                            onClick={addDef}>
                        <PlusIcon/>
                    </button>
                </div>
            </span>
        </div>
    )
}

const getEmptyTerm = () => ({
    term: '',
    definition: ['']
})

export type TermArray = Array<Card | undefined>
const TermsSection: FC<{terms: TermArray, setTerms: Dispatch<SetStateAction<TermArray>> | Function}> = ({terms, setTerms}) => {
    const addTerm = () => {
        // @ts-ignore
        setTerms([...terms, getEmptyTerm()])
    }

    const termSetter = (i: number) => (key: keyof Card, val: string | Array<string>) => {

        let newTerms = [...terms];
        // @ts-ignore
        newTerms[i][key] = val;
        setTerms(newTerms);
    }

    const removeTerm = (i: number) => () => {
        let newTerms = [...terms];
        newTerms.splice(i, 1);
        setTerms(newTerms);
    }

    const remover = (i: number) => removeTerm(i)


    return (<Section>
        <div>

            {terms.map((card, i) =>
                <Term key={i} setter={termSetter(i)} remove={remover(i)} {...terms[i] as Card}/>
            )}


        </div>
        <div className={'flex'}>
            <button tabIndex={-1} className={'w-[3rem] mx-auto hover:text-contrast text-secondary duration-200'}
                    onClick={addTerm}>
                <PlusCircleIcon/>
            </button>
        </div>
    </Section>)
}

export default TermsSection