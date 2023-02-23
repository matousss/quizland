import {FC, PropsWithChildren} from "react";

export const Section: FC<PropsWithChildren> = (props) => (
    <div className={'w-full flex'}>
        {props.children}
    </div>
)