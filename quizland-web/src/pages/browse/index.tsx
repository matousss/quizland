import {NextPage} from "next";
import NavBar from "@components/navigation/NavBar";
import {Section, SectionContainer} from "@components/sections";
import CardsIcon from "@components/utility/CardsIcon";
import {Text} from "@components/forms/input";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {ComponentProps, FC, ReactNode, useEffect, useState} from "react";
import {useGQL} from "../../../lib/hooks/graphql";
import {gql} from "@apollo/client";

const Entry = ({
                   title,
                   author,
                   description,
                   skeleton = false
               }: { title: ReactNode, author: ReactNode, description?: ReactNode, skeleton: boolean }) => {
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

const Browse: NextPage = (props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([])
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
    const client = useGQL();

    const submitSearch = async () => {
        if (searchQuery.length === 0) {
            return
        }
        setBtnDisabled(true);
        setResults([]);

        try {
            let response = await client.query({
                query: gql`
                    query SearchCardSets($query: String!) {
                        results: searchCardSets(query: $query) {
                            title: name
                            author: owner {
                                username
                            }
                            description
                        }
                    }
                `, variables: {
                    query: searchQuery
                }
            })
            console.log(response.data)
            setResults(response.data.results)
        } finally {
            setBtnDisabled(false)
        }
    }

    return (
        <>
            <NavBar/>


            <SectionContainer className={'md:pl-16'}>
                <Section>
                    <div className={'flex relative max-w-[500px]'}>
                        <input type={'text'} placeholder={'Goa\'uld names...'}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               className={'w-full border-secondary focus:border-contrast bg-middle outline-none ring-0 focus:ring-0 focus:outline-none duration-200 rounded-md'}/>
                        <button
                            className={'h-full absolute right-2 text-gray-500 hover:text-contrast duration-200 disabled:cursor-no-drop disabled:hover:text-gray-500'}
                            disabled={btnDisabled} onClick={submitSearch}>
                            <MagnifyingGlassIcon className={'w-7 h-7'}/>
                        </button>
                    </div>
                </Section>


                <Section className={'px-4 md:px-0 flex flex-col gap-4'}>
                    {
                        results.length > 0 && results.map(({__typename, author, ...r}, i) =>  <Entry author={author.username} {...r} key={i}/>)

                    }
                    {
                        !btnDisabled && results?.length === 0 &&  <div className={'text-center text-gray-500 text-[2rem] text-medium'}>I'm so empty ._.</div>
                    }

                    {btnDisabled &&
                        <><EntryLoading className={'opacity-80 animation-delay-0'}/>
                            <EntryLoading className={'opacity-80 animation-delay-200'}/>
                            <EntryLoading className={'opacity-80 animation-delay-400'}/>
                            <EntryLoading className={'opacity-80 animation-delay-600'}/></>}

                </Section>


            </SectionContainer>
        </>

    )
}

export default Browse