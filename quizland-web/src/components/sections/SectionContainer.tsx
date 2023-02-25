import {FC, PropsWithChildren} from "react";

export const SectionContainer: FC<PropsWithChildren> = (props) => (
    <div className={'w-full'}>
        {props.children}
    </div>
)