import {Section} from "@components/sections";
import {Switch, Text, TextArea} from "@components/forms/input";
import {FC, useEffect, useState} from "react";


const MetaSection: FC<{ setMeta: Function, defaultValues?: { isPrivate: boolean, description: string, name: string } }>
    = (
    {setMeta, defaultValues = {isPrivate: false, description: '', name: ''}}
) => {
    const [isPrivate, setIsPrivate] = useState<boolean>(defaultValues.isPrivate);
    const [description, setDescription] = useState<string>(defaultValues.description);
    const [name, setName] = useState<string>(defaultValues.name);
    useEffect(() => setMeta('isPrivate')(isPrivate), [isPrivate])
    useEffect(() => setMeta('description')(description), [description])
    useEffect(() => setMeta('name')(name), [name])

    return (<Section>
        <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-col sm:flex-row'}>
                <Text placeholder={'My awesome CardSet'} value={name} onChange={e => setName(e.target.value)} className={'text-lg'}/>

                <span className={'flex sm:ml-auto my-2 pl-2 sm:mt-auto mb-1 gap-2 text-lg'}>
                                Private: <Switch checked={isPrivate} onChange={setIsPrivate} className={'my-auto'}/>
                </span>
            </div>
            <TextArea
                placeholder={'Write some info about CardSet\neg. "Vocabulary from Mit Uns B2 L5B..."'}
                maxLength={1248}
                onChange={e => setDescription(e.target.value)}
                className={'text-[1.1rem]'}
            />


        </div>
    </Section>)
}

export default MetaSection;