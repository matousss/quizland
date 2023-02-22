import 'src/styles/global.css'
import type {AppProps} from 'next/app'
import React from "react";
import {SWRConfig} from "swr";


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {

    // @ts-ignore
    return <SWRConfig value={{}}>
        <Component {...pageProps} />


    </SWRConfig>

}

export default await MyApp
