import type { FC, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export const NavButton: FC<Props> = ({ children }) => {
    return (
        <div className={'navbtn bg-tercial text-text_a border-white border-groove \
        py-3 pl-3 sm:py-0 sm:px-6 \
        flex flex-col sm:flex-row sm:h-full items-start sm:items-center whitespace-nowrap sm:border-r-2 '}>
            {children}
        </div>
    )
}