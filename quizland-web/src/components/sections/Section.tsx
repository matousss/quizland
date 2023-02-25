import {FC, PropsWithChildren} from "react";

export const Section: FC<PropsWithChildren> = ({children}) => (
    <div className={'w-full px-2 md:px-6 py-8'}>
        {children}
    </div>
)

export const ExpandableSection: FC<PropsWithChildren>
    = ({children}) => (
    <div className={'w-full px-8'}>
        {children}
    </div>
)