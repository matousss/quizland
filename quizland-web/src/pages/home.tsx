import type {NextPage} from 'next'
import React from "react";
import NavBar from "@components/navigation/NavBar";
import {useUser} from "lib/hooks/user";
interface Props {
    clientId: string
}


// noinspection JSUnusedLocalSymbols
const Home: NextPage<Props, any> = (props) => {
    const user = useUser()
    return (
        <>
            <NavBar/>

            {/*<SocialButton provider={'Google'} onClick={login} icon={'/assets/google-icon.svg'}/>*/}
            <div>

                {user ? user.lastname : 'no user'}
                {user ? user.id : null}
            </div>
        </>
    )
}


export default Home
