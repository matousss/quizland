import type {NextPage} from 'next'
import styles from 'src/styles/Home.module.css'
import {NavBar} from "src/components/navigation/NavBar";


import React from "react";

import {useGoogleLogin} from "@react-oauth/google";
import SocialButton from "../components/auth/socialbuttons/SocialButton";

const Home: NextPage = (props) => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });



    return (
        <>
            <NavBar/>

            <SocialButton provider={'Google'} onClick={login} icon={'/assets/google-icon.svg'}/>

        </>
    )
}


export default Home
