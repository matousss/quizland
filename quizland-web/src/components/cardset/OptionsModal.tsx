import {FC, MouseEventHandler, PropsWithChildren} from "react";
import Modal from "@components/utility/Modal";

const OptionsModal: FC<PropsWithChildren & { show: boolean, onConfirm: MouseEventHandler }> = ({
                                                                                                   show,
                                                                                                   onConfirm,
                                                                                                   children
                                                                                               }) => {
    return <Modal isOpen={show}>
        <div className={'h-full flex flex-col p-6'}>
            {children}
            <div className={'w-full flex mt-auto'}>
            <span onClick={onConfirm}
                  className={'align-center mx-auto cursor-pointer rounded-lg py-2 px-4 text-lg bg-middle_dark hover:text-contrast hover:bg-primary duration-500'}>
            Start
            </span>
            </div>
        </div>
    </Modal>
}

export default OptionsModal