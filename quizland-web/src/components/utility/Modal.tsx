import {Transition} from "@headlessui/react";
import {FC, PropsWithChildren, useEffect, useState} from "react";

const Modal: FC<{isOpen: boolean} & PropsWithChildren> = ({ children, isOpen, close }) => {
    const [show, setShow] = useState(isOpen)

    useEffect(() => {
        if (isOpen) setShow(true)
    }, [isOpen])

    return (
        <Transition
            show = {show}
            enterTo={'opacity-100'}
            enterFrom={'opacity-0'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
            className={'fixed w-full h-full z-20 flex backdrop-blur-2xl top-0 duration-[600ms]'}>
            <Transition
                enterFrom={'opacity-0 translate-y-[50%]'}
                enterTo={'opacity-100 translate-y-0'}
                leaveFrom={'opacity-100 translate-y-0'}
                leaveTo={'opacity-0 translate-y-[50%]'}
                className={'mx-auto md:mt-28 w-full h-full md:w-4/5 lg:w-2/3 md:h-1/3 lg:h-1/2 md:rounded-lg bg-middle shadow-lg duration-500'}
                show={isOpen}
                afterLeave = {() => setShow(false)}
            >
                {children}
            </Transition>
        </Transition>
    )
}

export default Modal