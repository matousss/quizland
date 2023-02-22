import type {NextPage} from 'next'
import styles from 'src/styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {getCookie, getCookies} from "cookies-next";
import {NavBar} from "src/components/navigation/NavBar";
import {useUser} from "@lib/hooks/user";
interface Props {
    clientId: string
}


const Home: NextPage<Props, any> = (props) => {
    const user = useUser()
    return (
        <>
            <NavBar/>

            {/*<SocialButton provider={'Google'} onClick={login} icon={'/assets/google-icon.svg'}/>*/}
            <div>

                {user.lastname}
                {user.id}
            </div>
        </>
    )
}


export default Home
