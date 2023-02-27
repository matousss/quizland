import {URLSearchParams} from "next/dist/compiled/@edge-runtime/primitives/url";
import {CardSet} from "#types";


export const encodeDefs = (defs: Array<string>): string => defs.map(def => btoa(new Buffer(def, 'utf8').toString('latin1')).toString()).join(' ')

export const decodeDefs = (defs: string): Array<string> => defs.split(' ').map(def => new Buffer(atob(def), 'latin1').toString('utf8'))

/**
 * Passing existing CardSet between sites
 * */
export const cardsSetToQuery = ({id, name, description, cards}: CardSet): string => {
    let params = `name=${name}`

    if (description) {
        params += `&description=${description}`
    }
    if (id) {
        params += `&id=${id}`
    }

    let cardsParam = cards.map(({term, definition}) => new URLSearchParams({
        term: term,
        definition: encodeDefs(definition),
    }).toString())
    params += `&${cardsParam.join('&')}`
    return params;
}



