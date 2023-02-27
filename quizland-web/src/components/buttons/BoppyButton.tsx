import {ComponentProps, FC} from "react";

export const BoppyButton: FC<ComponentProps<'button'>> = ({className = '', ...props}) => (
    <button
        className={'bg-primary border-0  focus:ring-0 focus:border-0 transition duration-250 hover:scale-110 text-secondary hover:text-contrast ' + className}
        {...props}
    />
)