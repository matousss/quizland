'use client';

import {useUser} from "@lib/hooks/user";
import Image from "next/image";

const UserImage = () => {
    const user = useUser()
    const src = user.image || '/assets/user.svg'
    console.log({user})
    return <Image
        className="h-8 w-8 rounded-full m-auto"
        src={src}
        alt=""
        width={64}
        height={64}
    />
}

export default UserImage