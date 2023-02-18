import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React from "react";
import Head from "next/head";
import Script from 'next/script';
import {ApolloProvider, gql, useQuery} from "@apollo/client";
import client from "src/graphql";
import {SWRConfig} from "swr";
import {GoogleOAuthProvider} from "@react-oauth/google";


function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {

    // @ts-ignore
    return <SWRConfig value={{}}>

            <Head>


            </Head>
            <Component {...pageProps} />

    </SWRConfig>

}

export default await MyApp
