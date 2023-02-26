import {Switch as HSwitch} from "@headlessui/react";
import { FC} from "react";

const Switch: FC<{ checked: boolean, onChange: (checked: boolean) => void, className?: string }> = ({
                                                                                                       checked,
                                                                                                       className = '',
                                                                                                       ...props
                                                                                                   }) => (
    <HSwitch className={
        (checked ? 'bg-gray-500' : 'bg-middle') +
        ' relative inline-flex h-6 w-11 items-center rounded-full border-2 border-secondary ' + className}
             checked={checked}
             {...props}
    >
         <span
             className={`${
                 checked ? 'translate-x-5' : 'translate-x-1'
             } inline-block h-4 w-4 p-1.5 transform rounded-full bg-contrast transition`}
         />
    </HSwitch>
)

export default Switch;