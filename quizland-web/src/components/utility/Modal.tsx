import {Transition} from "@headlessui/react";
import {FC, PropsWithChildren} from "react";

const Modal: FC<{isOpen: boolean, close?: () => void} & PropsWithChildren> = ({ children, isOpen, close }) => {
    return (
        <div className={'fixed w-full h-full z-20 flex backdrop-blur-2xl top-0 ' + (isOpen ? '' : 'hidden')}>
            <Transition
                enterFrom={'opacity-0 translate-y-[50%]'}
                enterTo={'opacity-100 translate-y-0'}
                className={'mx-auto md:mt-28 w-full h-full md:w-4/5 lg:w-2/3 md:h-1/3 lg:h-1/2 md:rounded-lg bg-middle shadow-lg duration-500'}
                show={isOpen}
            >
                {children}
            </Transition>
        </div>
    )
}

export default Modal