import {GetServerSideProps, NextPage} from "next";
import React, {useEffect} from "react";
import {MetaType} from "@components/sections/create/MetaSection";
import {TermArray} from "@components/sections/create/TermsSection";
import {isString} from "postcss-selector-parser";
import {decodeDefs} from "../../../lib/encode";
import Editor from "@components/cardset/Editor";


export const getServerSideProps: GetServerSideProps = async ({ query}) => {
    let initialTerms
    let {name, description, term, definition} = query;

    deserializeCards : {
        if (!(term && definition)) break deserializeCards;

        try {
            if (Array.isArray(term) && Array.isArray(definition) && (term.length === definition.length)) {
                initialTerms = term.map((term, index) => (
                    {
                        term: term as string,
                        definition: definition ? decodeDefs(definition[index] as string) : ['']

                    }))
                break deserializeCards;
            }

            if (isString(term) && isString(definition)) {
                initialTerms = [({
                    term: atob(term as string),
                    definition: decodeDefs(definition as string)
                })]
                break deserializeCards;
            }
        } catch (e) {
            console.log(e)
            // ignore atob errors
            return {
                props: {
                    error: ['Invalid query parameters']
                }
            }
        }
    }

    let meta: MetaType = {
        name: name ? name as string : '',
        description: description ? description as string : '',
        isPrivate: false
    }
    return {
        props: {
            meta: meta,
            terms: initialTerms
        }

    }
}
const Create: NextPage<{meta: MetaType, terms: TermArray, error?: Array<string>}> = ({meta, terms, error= []}) => {
    useEffect(() => window.history.replaceState(null, document.title, "/cardset/create"), [
        window
    ])

    return <Editor initialMeta={meta} initialTerms={terms} initialErrors={error}/>
}

export default Create;