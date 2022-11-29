import type { FC, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export const NavButton: FC<Props> = ({ children }) => {
    return (
        <div className={'navbtn inline-block bg-tercial text-text_a p-2'}>
            {children}
        </div>
    )
}