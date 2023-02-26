import {ComponentProps, FC} from "react";

const Text: FC<ComponentProps<'input'>> = ({className = '', ...props}) => (
    <input type={'text'}
           className={'bg-primary border-0 border-b-2 border-secondary focus:ring-0 focus:border-contrast transition duration-250 ' + className}
           {...props}
    />
)

export default Text;