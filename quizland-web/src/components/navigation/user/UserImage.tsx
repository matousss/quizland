'use client';

import {useUser} from "@lib/hooks/user";
import Image from "next/image";
import {getCookie} from "cookies-next";

const UserImage = () => {
    const user = useUser()
    const src = user.image || '/assets/user.svg'
    console.log({user})
    return <img
        className="h-8 w-8 rounded-full"
        src={src}
        alt=""
    />
}

export default UserImage