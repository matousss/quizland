import type { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const NavButton: FC<Props> = ({ children }) => {
    return (
        <div className={'h-full inline-block p-3'}>
            {children}
        </div>
    )
}