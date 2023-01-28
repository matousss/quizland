import type {FC, ReactNode} from "react";
import Image from 'next/image'

type Props = {
    children: ReactNode;
}

export const NavBar: FC<Props> = ({children}) => {
    return (
        <div className={'navbar bg-primary sm:border-b-2 border-double border-white sticky \
        flex sm:flex-row flex-col \
        sm:w-full w-2/5 h-[100vh] md:h-16 sm:h-14   text-center '}>
            {children}
        </div>
    )
}