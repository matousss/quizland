import {FC, PropsWithChildren} from "react";

export const SectionContainer: FC<PropsWithChildren> = (props) => (
    <div className={'w-full min-h-full bg-gray-800'}>
        {props.children}
    </div>
)