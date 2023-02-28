import {FC, PropsWithChildren} from "react";

export const Section: FC<PropsWithChildren & {className?: string}> = ({children, className=''}) => (
    <div className={'w-full px-2 md:px-6 py-8 ' + className}>
        {children}
    </div>
)