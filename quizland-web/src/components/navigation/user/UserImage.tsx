'use client';

import Image from "next/image";
import {FC} from "react";

const UserImage: FC<{src?: string}> = ({src}) => {

    const source = src || '/assets/user.svg'

    return <Image
        className="h-8 w-8 rounded-full m-auto"
        src={source}
        alt=""
        width={64}
        height={64}
    />
}

export default UserImage