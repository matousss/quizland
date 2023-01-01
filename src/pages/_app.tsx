import '../../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import mongoClient, {AUTH_COLLECTIONS, AUTH_DB} from "lib/mongodb";

function MyApp({Component, pageProps}: AppProps) {
    // @ts-ignore
    return <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        </SessionProvider>

}

export default MyApp
