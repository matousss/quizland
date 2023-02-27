import {NextPage} from "next";
import NavBar from "@components/navigation/NavBar";
import {SectionContainer} from "@components/sections";
import {TitleSection} from "@components/sections";
import {useState} from "react";
import MetaSection from "@components/sections/create/MetaSection";
import TermsSection, {TermArray} from "@components/sections/create/TermsSection";

const Create: NextPage = () => {
    const meta = {
        isPrivate: false,
        description: '',
        name: ''
    }
    const setMeta = (key: keyof typeof meta) => (value: string | boolean) => {
        // @ts-ignore
        meta[key] = value;
        console.log({meta})
    }

    const [terms, setTerms] = useState<TermArray>([])


    return (
        <>
            <NavBar/>
            <SectionContainer>
                <TitleSection title={"Create CardSet"}/>
                <MetaSection setMeta={setMeta}/>
                <TermsSection terms={terms} setTerms={setTerms}/>
            </SectionContainer>

        </>
    )
}



export default Create;