import type {NextPage} from 'next'
import styles from 'src/styles/Home.module.css'
import {NavBar} from "src/components/navigation/NavBar";


import React from "react";

import {GoogleLogin, GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";
import {GoogleButton} from "../components/auth/socialbuttons";
import {useRouter} from "next/router";
import {options} from "tsconfig-paths/lib/options";

interface Props {
    clientId: string
}
export const getStaticProps = async ():Promise<{props: Props}> => {
    return {
        props: {
            clientId: process.env.GOOGLE_CLIENT_ID as string
        }
    }

}
const Home: NextPage<Props, any> = (props) => {



    return (
        <>
            <NavBar/>

            {/*<SocialButton provider={'Google'} onClick={login} icon={'/assets/google-icon.svg'}/>*/}
            <GoogleOAuthProvider clientId={props.clientId}>
                <GoogleButton/>
            </GoogleOAuthProvider>
        </>
    )
}


export default Home
