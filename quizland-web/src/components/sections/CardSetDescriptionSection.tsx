import React, {FC} from "react";
import UserImage from "../navigation/user/UserImage";
import Moment from "moment";

import type { User } from "#types";
import type {Maybe} from "graphql/jsutils/Maybe";
import {Section} from "@components/sections/Section";

const CardSetDescriptionSection: FC<{ author: User, description?: Maybe<string>, modified?: Date | number, termLng?: Maybe<string>, definitionLng?: Maybe<string> }>
    = ({description, modified, author, termLng, definitionLng}) => (
    <Section>
        <div className={'flex flex-col pt-3 divide-y divide-secondary pl-2 select-none'}>
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
            <div className={'bg-secondary rounded-md p-4'}>
                {termLng && <div className={'text-gray-400'}>Language: {termLng}{definitionLng && definitionLng !== termLng ? ' ↔ ' + definitionLng : ''}</div>}

                <p className={'text-md'}>{description}</p>

            </div>
        </div>
    </Section>
)

export default CardSetDescriptionSection