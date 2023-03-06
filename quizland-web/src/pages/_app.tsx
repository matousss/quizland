import 'src/styles/global.css'
import type {AppProps} from 'next/app'
import React, {useEffect} from "react";
import Head from 'next/head';


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    useEffect(() => {
        if (localStorage.getItem('checked')) {


            localStorage.setItem('checked', 'true')
        }
    }, [])
    // @ts-ignore
    return <>
        <Head>
            <title>QuizLand</title>
        </Head>
        <Component {...pageProps} />

    </>


}

export default await MyApp
