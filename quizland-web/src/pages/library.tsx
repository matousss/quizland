import {NextPage} from "next";
import NavBar from "@components/navigation/NavBar";
import React, {ComponentProps, FC, useState} from "react";
import {Entry, EntryLoading} from "@components/cardset/Entry";
import {Section, SectionContainer} from "@components/sections";
import {useGQL} from "../../lib/hooks/graphql";
import {gql} from "@apollo/client";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

const EditButton: FC<ComponentProps<'a'>> = (props) => (
    <a className={'hover:text-contrast hover:scale-110 duration-200'} {...props}><PencilSquareIcon
        className={'w-6 h-6'}/></a>
)
const Library: NextPage = () => {
    const [entries, setEntries] = useState<Array<{ title: string, description: string, id: string }> | null>(null)
    const client = useGQL();

    client.query({
        query: gql`
            query GetCardSets {
                results: fetchCardSets {
                    title: name
                    description
                    id
                }
            }
        `

    }).then(response => setEntries(response.data.results))




    return (
        <>
            <NavBar/>
            <SectionContainer>
                <Section className={'px-4 md:px-0 flex flex-col gap-4'}>
                    {
                        entries ? entries.map(({title, id, description}) =>
                            <a href={'/cardset/' + id}>
                                <Entry title={title}
                                       description={description} author={<EditButton href={'cardset/edit/' + id}/>}/>
                            </a>
                        ) : <>
                            <EntryLoading className={'opacity-80 animation-delay-0'}/>
                            <EntryLoading className={'opacity-80 animation-delay-200'}/>
                            <EntryLoading className={'opacity-80 animation-delay-400'}/>
                            <EntryLoading className={'opacity-80 animation-delay-600'}/></>
                    }
                </Section>
            </SectionContainer>
        </>
    )
}


export default Library

