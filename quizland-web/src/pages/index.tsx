import type {NextPage} from 'next'
import styles from 'src/styles/Home.module.css'
import {NavBar} from "src/components/navigation/NavBar";
import Image from "next/image"
import Link from 'next/link';

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
            <NavBar/>
            <GoogleButton />
        </>
    )
}


export default Home
