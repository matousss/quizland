import {Section} from "@components/sections";
import {Switch, Text, TextArea} from "@components/forms/input";
import {FC, useEffect, useState} from "react";

export type MetaType =  { isPrivate: boolean, description: string, name: string }
const MetaSection: FC<{ meta: MetaType, setMeta: Function,  }>
    = (
    {setMeta, meta = {isPrivate: false, description: '', name: ''}}
) => {
    const [isPrivate, setIsPrivate] = useState<boolean>(meta.isPrivate);
    const [description, setDescription] = useState<string>(meta.description);
    const [name, setName] = useState<string>(meta.name);
    useEffect(() => setMeta('isPrivate')(isPrivate), [isPrivate])
    useEffect(() => setMeta('description')(description), [description])
    useEffect(() => setMeta('name')(name), [name])
    useEffect(() => {
        setIsPrivate(meta.isPrivate)
        setDescription(meta.description)
        setName(meta.name)
    }, [meta])

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