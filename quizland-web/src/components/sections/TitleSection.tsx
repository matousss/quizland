import React, {FC} from "react";
import {Section} from "@components/sections/Section";

const TitleSection: FC<{ title: string }> = ({title}) => (
    <Section>
        <div className={'flex flex-col'}>
            <h1 className={'text-3xl font-bold'}>{title}</h1>
        </div>
    </Section>
)

export default TitleSection