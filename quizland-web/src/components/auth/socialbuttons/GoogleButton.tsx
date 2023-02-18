import {useGoogleLogin} from "@react-oauth/google";
import React from "react";
import SocialButton from "./SocialButton";

const GoogleButton = () => {
    const login = useGoogleLogin({
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        ux_mode: 'redirect',
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    })

    return <SocialButton provider={'Google'} onClick={login} icon={'/assets/google-icon.svg'}/>
}

export default GoogleButton