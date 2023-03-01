import {gql} from "@apollo/client";
import {EventHandler, FC, MouseEvent, useState} from "react";
import MetaSection, {MetaType} from "@components/sections/create/MetaSection";
import TermsSection, {TermArray} from "@components/sections/create/TermsSection";
import {useRouter} from "next/router";
import {useGQL} from "../../../lib/hooks/graphql";
import NavBar from "@components/navigation/NavBar";
import {Section, SectionContainer, TitleSection} from "@components/sections";

const CREATE_CARDSET = gql`
    mutation ($cards: [CardInput!]!, $name: String!, $description: String) {
        setID: createCardSet(cards: $cards, name: $name, description: $description)
        {
            id
        }
    }
`

const UPDATE_CARDSET = gql`
    mutation ($id: ID!, $cards: [CardInput!]!, $name: String!, $description: String) {
        setID: updateCards(cards: $cards, id: $id)        {
            id
        }
        updateItem(id: $id, description: $description, name: $name)
    }`

/**
 * If id is passed editing is enabled otherwise ceation is enabled
 * */
const Editor: FC<{
    initialMeta: MetaType, initialTerms: TermArray, initialErrors?: Array<string>, id?: string
}>
    = ({
           initialMeta, initialTerms, initialErrors = [], id
       }) => {
    const editing = id !== undefined;


    const router = useRouter()
    const [errors, setErrors] = useState<Array<string>>(initialErrors)
    const [meta, setMeta] = useState(initialMeta)
    const [terms, setTerms] = useState<TermArray>(initialTerms)

    const setMetaValue = (key: keyof typeof meta) => (value: string | boolean) => {
        // @ts-ignore
        meta[key] = value;
        setMeta(meta)
    }

    const client = useGQL()
    const [disabled, setDisabled] = useState(false)


    // validate input and submit
    const submit: EventHandler<MouseEvent<HTMLButtonElement>> = async () => {
        setDisabled(true)
        setErrors([]);
        let response
        try {
            let errors = [];
            let newTerms = terms.filter((val) => val?.term && val.definition[0]);
            if (meta.name === "") errors.push("Name is required!");
            if (newTerms.length < 2) errors.push("You have to include at least 2 cards!");
            if (errors.length !== 0) return setErrors(errors);

            let passedMeta
            if (editing) passedMeta = {...meta, id: id}
            else passedMeta = meta


            try {
                let {isPrivate, ...rest} = passedMeta

                response = await client.mutate({
                        mutation: editing ? UPDATE_CARDSET : CREATE_CARDSET,
                        variables: {
                            cards: newTerms,
                            ...rest,
                            permissions: meta.isPrivate ? [] : null
                        }
                    },
                );
            } catch (e) {
                console.log(e)
                setErrors(["Something went wrong!"])
                return
            }
            await router.push('/cardset/' + response.data.setID.id);

        } finally {
            setDisabled(false);
        }

    }


    return (
        <>
            <NavBar/>
            <SectionContainer>

                <div className={disabled ? 'cursor-wait disabled:cursor-wait' : ''}>
                    <TitleSection title={editing ? "Edit CardSet" : "Create CardSet"}/>
                    <fieldset disabled={disabled}>
                        <div className={'relative'}>
                            <MetaSection meta={meta} setMeta={setMetaValue}/>
                            <TermsSection terms={terms} setTerms={setTerms}/>
                            {disabled && <div className={'absolute w-full h-full top-0 cursor-wait'}></div>}
                        </div>
                    </fieldset>
                    <Section className={'flex flex-col justify-center pb-12'}>
                        <div className={'flex flex-col ml-auto'}>
                            <div className={'text-red-500 pt-1 h-16 text-center'}>
                                {errors.map((e, i) => <div key={i}>{e}</div>)}
                            </div>
                            <div className={'flex justify-end'}>
                                <button onClick={submit}
                                        disabled={disabled}
                                        className={'button mr-8 px-5 py-3 ' +
                                            'bg-middle disabled:bg-green-900 disabled:hover:bg-green-900 disabled:animate-pulse disabled:text-contrast disabled:cursor-wait hover:bg-green-900 border border-secondary text-xl duration-200'}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </Section>
                </div>
            </SectionContainer>

        </>
    )
}


export default Editor