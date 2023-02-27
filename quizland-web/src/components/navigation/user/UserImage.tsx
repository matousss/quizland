'use client';

import Image from "next/image";
import {FC} from "react";

const UserImage: FC<{src?: string, className?: string}> = ({src, className=''}) => {

    const source = src || '/assets/user.svg'

    return <Image
        className={"h-10 w-10 rounded-full m-auto bg-contrast " + className}
        src={source}
        alt={"user avatar"}
        width={64}
        height={64}
    />
}

export default UserImage