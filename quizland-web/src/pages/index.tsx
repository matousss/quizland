import type {NextPage} from 'next'
import styles from 'src/styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {NavBar} from "src/components/navigation/NavBar";
interface Props {
    clientId: string
}


const Home: NextPage<Props, any> = (props) => {
    const us = getCookie('user') || '{}'
    const [userCookie, setUserCookie] = useState('')
    useEffect(() => {
        setUserCookie(getCookie('user') as string)
    }, [])

    console.log(us)
    return (
        <>
            <NavBar/>

            {/*<SocialButton provider={'Google'} onClick={login} icon={'/assets/google-icon.svg'}/>*/}
            <div>
                {userCookie}
            </div>
        </>
    )
}


export default Home
