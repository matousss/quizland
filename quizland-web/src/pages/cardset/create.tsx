import {NextPage} from "next";
import NavBar from "@components/navigation/NavBar";
import {SectionContainer} from "@components/sections";
import {TitleSection} from "@components/sections";
import React from "react";
import MetaSection from "@components/sections/create/MetaSection";

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


    return (
        <>
            <NavBar/>
            <SectionContainer>
                <TitleSection title={"Create CardSet"}/>
                <MetaSection setMeta={setMeta}/>
            </SectionContainer>

        </>
    )
}

export default Create;