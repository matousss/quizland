import React, {FC} from "react";
import {ExpandableSection, Section} from "./Section";
import UserImage from "../navigation/user/UserImage";
import Moment from "moment";

import type { User } from "#types";

const TitleSection: FC<{ title: string }> = ({title}) => (
    <Section>
        <div className={'flex flex-col'}>
            <h1 className={'text-3xl font-bold'}>{title}</h1>
        </div>
    </Section>
)

const DescriptionSection: FC<{ author: User, description?: string | undefined, modified?: Date | number, expanded?: boolean }>
    = ({description, modified, author}) => (
    <ExpandableSection>
        <div className={'flex flex-col pt-3 divide-y divide-gray-600 pl-2 select-none'}>
            <div className={'flex pt-2 pb-4 pl-2 text-gray-400'}>
                <div className={'group flex hover:text-white cursor-pointer'}>
                    <div className={'rounded-full border-gray-400 group-hover:border-white border'}>
                        <UserImage src={author.image as string | undefined}/>
                    </div>
                    <div className={'pl-2 my-auto'}>
                        {author.username || author.surname + " " + author.lastname}
                    </div>
                </div>
                <div className={'grow'}></div>
                <div className={'pr-4 my-auto'}>
                    {modified && "Last change " + Moment(modified).fromNow()}
                </div>
            </div>
            <div className={'bg-gray-600 rounded-md p-4'}>
                <p className={'text-md'}>{description}</p>

            </div>
        </div>
    </ExpandableSection>
)

export {TitleSection, DescriptionSection}