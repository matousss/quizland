import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import React from "react";
import Head from "next/head";
import Script from 'next/script';
import {ApolloProvider, gql, useQuery} from "@apollo/client";
import client from "src/apollo_client";




function MyApp({Component, pageProps}: AppProps) {

    // @ts-ignore
    return <>
        <Head>


        </Head>
        <Component {...pageProps} />
    </>

}
export default await MyApp
