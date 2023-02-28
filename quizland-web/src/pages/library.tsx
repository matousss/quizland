import {NextPage} from "next";
import NavBar from "@components/navigation/NavBar";
import React, {ComponentProps, FC, useState} from "react";
import {Entry, EntryLoading} from "@components/cardset/Entry";
import {Section, SectionContainer} from "@components/sections";
import {useGQL} from "../../lib/hooks/graphql";
import {gql} from "@apollo/client";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";

const EditButton: FC<ComponentProps<'a'>> = (props) =>
    <a className={'hover:text-contrast hover:scale-110 duration-200 text-middle'} {...props}>
        <PencilSquareIcon
            className={'w-8 h-8'}/>
    </a>


const DeleteButton: FC<ComponentProps<'button'>> = (props) =>
    <button
        className={'hover:text-red-500 hover:scale-110 duration-200 text-middle'} {...props}>
        <TrashIcon className={'w-8 h-8'}/>
    </button>


const Library: NextPage = () => {
    const [entries, setEntries] = useState<Array<{ title: string, description: string, id: string }> | null>(null)
    const client = useGQL();

    fetchEntries : {
        if (entries) break fetchEntries;

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

        }).then(response => setEntries(response.data.results)).catch(console.error)
    }

    const deleteSet = (id: string) => {

        // @ts-ignore
        setEntries(entries.filter(entry => entry.id !== id))
        client.mutate({
            mutation: gql`
                mutation DeleteCardSet($id: ID!) {
                    deleteItem(id: $id)
                }
            `,
            variables: {id}
        }).catch(console.error )
    }

    return (
        <>
            <NavBar/>
            <SectionContainer>
                <Section className={'px-4 md:px-0 flex flex-col gap-4'}>
                    {
                        entries ? entries.map(({title, id, description}) =>
                            <div key={id} className={'flex'}>
                            <a href={'/cardset/' + id} className={'grow'}>
                                <Entry title={title}
                                       description={description} author={''}
                                />
                            </a>
                                <div className={'ml-6 mt-2 flex flex-col gap-2'}>
                                    <EditButton href={'cardset/edit/' + id}/>
                                    <DeleteButton onClick={() => deleteSet(id)}/>
                                </div>
                        </div>
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

