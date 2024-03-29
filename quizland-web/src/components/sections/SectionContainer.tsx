import {FC, PropsWithChildren} from "react";

export const SectionContainer: FC<PropsWithChildren & {className?: string}> = (props) => (
    <div className={'divide-y divide-secondary divide-dashed w-full md:mx-8 px-4 md:w-2/3 ' + props.className}>
        {props.children}
    </div>
)
