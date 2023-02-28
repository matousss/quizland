import {ComponentProps, FC, ReactNode} from "react";
import CardsIcon from "@components/utility/CardsIcon";

const Entry = ({
                   title,
                   author,
                   description,
                   skeleton = false
               }: { title: ReactNode, author: ReactNode, description?: ReactNode, skeleton?: boolean }) => {
    return (
        <div
            className={'bg-middle duration-200 rounded-xl flex h-28 md:h-40 ' + (skeleton ? '' : 'hover:cursor-pointer hover:scale-105')}>
            <div className={'hidden sm:block p-4 md:py-8 md:pl-8'}>
                <div
                    className={'w-20 md:w-24 border-2 border-gray-500 rounded-full p-2 text-gray-500 ' + (skeleton ? 'animate-pulse' : '')}>
                    <CardsIcon/>
                </div>
            </div>
            <span className={'m-4 mr-0 grow flex flex-col'}>
                    <div className={'relative'}>
                        <span className={'text-xl font-medium'}>
                            {title}
                        </span>
                        <span className={'hidden sm:block absolute text-medium text-gray-400 right-6 top-0'}>
                            {author}
                        </span>
                    </div>
                    <div
                        className={'text-md bg-secondary mr-6 mt-2 h-full relative rounded-md overflow-none ' + (skeleton ? 'animate-pulse' : 'py-1 px-2')}>
                        {description}
                    </div>

                </span>
        </div>
    )
}

const EntryLoading: FC<ComponentProps<'div'>> = ({className, ...props}) => <div
    className={'animate-pulse ' + className} {...props}>
    <Entry
        title={<div className={'bg-gray-500 w-1/2 h-6 rounded-full'}/>}
        author={<span className={'animate-pulse inline-block bg-gray-500 mt-0.5 w-24 h-5 rounded-full'}/>}
        skeleton={true}
    />

</div>

export {Entry, EntryLoading}