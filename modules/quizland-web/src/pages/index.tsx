import type {NextPage} from 'next'
import styles from 'src/styles/Home.module.css'
import {NavBar} from "src/components/navigation/NavBar";
import {NavButton} from "src/components/navigation/NavButton";
import Image from "next/image"
import Link from 'next/link';
import {NavLink} from "src/components/navigation/NavLink";
import React from "react";
import Script from "next/script";
import {GoogleButton} from "src/components/auth/socialbuttons/GoogleButton";


export function getStaticProps() {
    return {
        props: {
            // will be passed to the page component as props
        },
    }
}

const Home: NextPage = (props) => {



    return (
        <>


            <NavBar>
                <NavButton>
                    a
                </NavButton>
                {/*<Link href={'/'}>*/}
                {/*<Image src={'https://dummyimage.com/900x600/00adcc/dd00ff'} alt={'logo'} width={900} height={600} layout={'fill'} className={'object-down-scale h-full inline-block max-w-[10px]'} />*/}
                {/*</Link>*/}

                <NavButton>Blank button</NavButton>
                <NavLink title={'home'} href={'/ahoj'}/>
                <NavLink title={'test'} href={'/test'}/>

            </NavBar>
            <GoogleButton />
        </>
    )
}


export default Home
