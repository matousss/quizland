import type {FC, ReactNode} from "react";
import Image from 'next/image'

type Props = {
    children: ReactNode;
}

export const NavBar: FC<Props> = ({children}) => {
    return (
        <div className={'bg-primary sticky w-full h-16 bg-gray-300'}>  
            {children}
        </div>
    )
}