import {ComponentProps, FC} from "react";

const ShuffleIcon: FC<ComponentProps<'svg'>> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M 4.5 19.5 L 19.5 4.5"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M 19.5 4.5 L 14.25 4.5"/>
        <path strokeLinecap="round" strokeLinejoin="round" d=" M 19.5 4.5 L 19.5 9.75"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M 19.5 19.5 L 4.5 4.5 "/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M 19.5 19.5 L 14.25 19.5"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M 19.5 19.5 L 19.5 14.25"/>
    </svg>
)

export default ShuffleIcon