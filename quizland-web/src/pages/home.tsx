import type {NextPage} from 'next'
import React from "react";
import NavBar from "@components/navigation/NavBar";
import {useUser} from "lib/hooks/user";
import {Section, SectionContainer} from "@components/sections";
import Link from "next/link";
interface Props {
    clientId: string
}


// noinspection JSUnusedLocalSymbols
const Home: NextPage<Props, any> = (props) => {
    const user = useUser()
    return (
        <>
            <NavBar/>

            <SectionContainer>
                <Section>
                    <Link href={'/library'}>
                        Open library
                    </Link>
                    <Link href={'/browse'}>
                        Browse
                    </Link>
                    <Link href={'/cardset/create'}>
                        Create cardset
                    </Link>
                </Section>

            </SectionContainer>
        </>
    )
}


export default Home
