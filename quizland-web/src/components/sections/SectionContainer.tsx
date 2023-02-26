import {FC, PropsWithChildren} from "react";

export const SectionContainer: FC<PropsWithChildren> = (props) => (
    <div className={'divide-y divide-gray-600 divide-dashed w-full md:mx-8 px-4 md:w-2/3'}>
        {props.children}
    </div>
)