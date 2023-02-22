import 'src/styles/global.css'
import type {AppProps} from 'next/app'
import React, {useEffect} from "react";
import {SWRConfig} from "swr";


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    useEffect(() => {
        if (localStorage.getItem('checked')) {


            localStorage.setItem('checked', 'true')
        }
    }, [])
    // @ts-ignore
    return <SWRConfig value={{}}>
        <Component {...pageProps} />


    </SWRConfig>

}

export default await MyApp
