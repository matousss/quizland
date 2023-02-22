import {useGoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import React, {FC} from "react";
import SocialButton from "./SocialButton";

const LoginBtn = (props: any) => {
    const login = useGoogleLogin({
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        ux_mode: 'redirect',
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    })
    console.log(process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI)
    return <SocialButton provider={'Google'} onClick={login} icon={'/assets/google-icon.svg'} {...props}/>
}
const GoogleButton: FC<{ className: string }> = (props) => {


    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <LoginBtn {...props}/>
        </GoogleOAuthProvider>
    )
}

export default GoogleButton