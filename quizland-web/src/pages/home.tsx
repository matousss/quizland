import type {NextPage} from 'next'
import React, {ComponentProps, FC, PropsWithChildren} from "react";
import NavBar from "@components/navigation/NavBar";
import {useUser} from "lib/hooks/user";
import {Section, SectionContainer} from "@components/sections";
import Link from "next/link";
import {BookOpenIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

interface Props {
    clientId: string
}

const SLink: FC<{ href: string } & PropsWithChildren> = ({href, children}) => (
    <Link href={href}
          className={'bg-middle inline-block sm:w-40 md:w-60 m-4 md:m-10 p-1 md:p-4 divide-y gap-2 divide-secondary flex flex-col justify-center text-center text-medium sm:text-lg md:text-xl rounded-lg duration-500 hover:scale-110'}>
        {children}
    </Link>
)

// noinspection JSUnusedLocalSymbols
const Home: NextPage<Props, any> = (props) => {
    const user = useUser()
    return (
        <>
            <NavBar/>

            <div className={'flex flex-col sm:flex-row grow justify-center'}>

                <SLink href={'/library'}>
                    <div>
                        Open library
                    </div>
                    <div className={'flex justify-center py-2 md:py-8'}>
                        <BookOpenIcon className={'w-10 sm:w-20'}/>
                    </div>
                </SLink>
                <SLink href={'/browse'}>
                    <div>
                        Browse CardSets
                    </div>
                    <div className={'flex justify-center py-2 md:py-8'}>
                        <MagnifyingGlassIcon className={'w-10 sm:w-20'}/>
                    </div>
                </SLink>
                <SLink href={'/cardset/create'}>
                    <div>
                        Create CardSet
                    </div>
                    <div className={'flex justify-center py-2 md:py-8'}>
                        <PencilSquareIcon className={'w-10 sm:w-20'}/>
                    </div>
                </SLink>
            </div>
        </>
    )
}


export default Home
