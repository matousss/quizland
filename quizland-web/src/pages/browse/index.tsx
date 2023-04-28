import {NextPage} from "next";
import NavBar from "@components/navigation/NavBar";
import {Section, SectionContainer} from "@components/sections";

import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {useGQL} from "@lib/hooks/graphql";
import {gql} from "@apollo/client";
import {Entry, EntryLoading} from "@components/cardset/Entry";



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
                            id
                        }
                    }
                `, variables: {
                    query: searchQuery
                }
            })

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
                        results.length > 0 && results.map(({__typename, author, id, ...r}, i) =>
                            <a href={'/cardset/' + id} key={i}>
                                <Entry author={author.username} {...r} />
                            </a>
                        )

                    }
                    {
                        !btnDisabled && results?.length === 0 &&  <div className={'text-center text-gray-500 text-[2rem] text-medium'}>{"I'm so empty ._."}</div>
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