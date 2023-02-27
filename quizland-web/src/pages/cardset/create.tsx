import {NextPage} from "next";
import NavBar from "@components/navigation/NavBar";
import {Section, SectionContainer} from "@components/sections";
import {TitleSection} from "@components/sections";
import {EventHandler, MouseEvent, useEffect, useState} from "react";
import MetaSection from "@components/sections/create/MetaSection";
import TermsSection, {TermArray} from "@components/sections/create/TermsSection";
import {useGQL} from "../../../lib/hooks/graphql";
import {gql} from "@apollo/client";
import {useRouter} from "next/router";

const Create: NextPage = () => {
    const [meta, setMeta] = useState({
        isPrivate: false,
        description: '',
        name: ''
    })
    const setMetaValue = (key: keyof typeof meta) => (value: string | boolean) => {
        // @ts-ignore
        meta[key] = value;
        setMeta(meta)
    }

    const [terms, setTerms] = useState<TermArray>([])
    const client = useGQL()
    const router = useRouter()
    const [errors, setErrors] = useState<Array<string>>([])
    const [btnDisabled, setBtnDisabled] = useState(false)
    const submit: EventHandler<MouseEvent<HTMLButtonElement>> = async () => {
        setBtnDisabled(true)
        setErrors([]);
        let response
        try {
            let errors = [];
            let newTerms = terms.filter((val) => val?.term && val.definition[0]);
            if (meta.name === '') errors.push("Name is required!");
            if (newTerms.length < 2) errors.push("You have to include at least 2 cards!");
            if (errors.length !== 0) return setErrors(errors);



            try {
                response = await client.mutate({
                        mutation: gql`
                            mutation ($cards: [CardInput!]!, $name: String!, $description: String) {
                                newSet: createCardSet(cards: $cards, name: $name, description: $description)
                                {
                                    id
                                }
                            }
                        `
                        ,
                        variables: {
                            cards: newTerms,
                            ...meta
                        }
                    },
                );
            } catch (e) {
                console.log(e)
                return
            }

        } finally {
            setBtnDisabled(false);
        }
        router.push('/cardset/' + response.data.newSet.id);
    }

    return (
        <>
            <NavBar/>
            <SectionContainer>
                <TitleSection title={"Create CardSet"}/>
                <MetaSection meta={meta} setMeta={setMetaValue}/>
                <TermsSection terms={terms} setTerms={setTerms}/>
                <Section className={'flex flex-col justify-center pb-12'}>


                    <div className={'flex flex-col mx-auto'}>
                        <div className={'text-red-500 pt-1 h-16 text-center'}>
                            {errors.map((e, i) => <div key={i}>{e}</div>)}
                        </div>
                        <div className={'flex justify-end'}>
                            <button onClick={submit}
                                    disabled={btnDisabled}
                                    className={'button mr-8 px-5 py-3 ' +
                                        'bg-middle disabled:bg-red-800 disabled:hover:bg-red-800 disabled:text-gray-600 disabled:cursor-disabled hover:bg-green-900 border border-secondary text-xl duration-200'}>
                                Save
                            </button>
                        </div>
                    </div>


                </Section>
            </SectionContainer>

        </>
    )
}


export default Create;