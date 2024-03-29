import {AuthError} from "lib/page_errors/auth";
import {Tab} from "@headlessui/react";
import React, {FC} from "react";
import {GoogleButton, SocialButton} from "@components/auth/socialbuttons";
import {useRouter} from "next/router";
import NavBar from "@components/navigation/NavBar";

interface Props {
    error_codes: typeof AuthError
}

export const getStaticProps = async (): Promise<{ props: Props }> => {
    return {
        props: {
            error_codes: AuthError
        }
    }
}

const TabBtn: FC<{ label: string }> = ({label}) => (

    <Tab className={'py-3 w-full border-none flex ring-0 outline-none'}>
        {({selected}) => (
            <div className={(selected ? 'border-b text-white ' : '') + ' m-auto'}>
                {label}
            </div>
        )}
    </Tab>
)

const Auth = ({error_codes}: Props) => {
    const query = useRouter().query
    let errorMessage = null
    if (query.error !== undefined) {
        switch (parseInt(query.error as string, 10)) {
            case error_codes.PROVIDER_USER_NOT_FOUND:
                errorMessage = 'User not found at provider, try different provider or try it again in a few minutes'
                break
            case error_codes.NO_CREDENTIALS:
            case error_codes.PROVIDER_ERROR:
            default:
                errorMessage = 'Unexpected error, try it again in a few minutes'
                break
        }

        window.history.replaceState(null, document.title, "/auth")
    }


    return (
        <div className={'flex h-full w-full flex-col'}>
            <NavBar/>
            <div className={'bg-primary md:flex grow'}>
                <Tab.Group as={"div"}
                           className={'md:rounded-md h-full md:h-1/2 md:w-1/2 bg-middle m-auto divide-y flex flex-col drop-shadow-xl'}>
                    <Tab.List className={'w-full grow-0 bg-middle md:rounded-t-md'}>
                        <div className={'flex'}>
                            <TabBtn label={'3rd party account'}/>
                            <TabBtn label={'Credentials'}/>
                        </div>
                    </Tab.List>
                    <Tab.Panels className={'flex flex-col grow bg-middle md:rounded-b-md'}>
                        <Tab.Panel className={'flex flex-col grow animate-fadein'}>
                            <h1 className={'text-xl ml-6 mt-6'}>
                                Use 3rd party auth:
                            </h1>

                            <div className={'flex flex-col grow'}>
                                <div className={'absolute text-red-500 text-center pt-2 flex w-full'}>
                                    <div className={'m-auto w-2/3'}>
                                        {errorMessage}
                                    </div>
                                </div>
                                <div className={'mx-auto mt-[20%] md:my-auto pb-5 w-2/3 lg:w-2/5 gap-y-3'}>


                                    <GoogleButton
                                        className={'rounded-md border bg-white text-black mx-auto w-full mb-3'}/>

                                    <SocialButton provider={'More coming soon...'}
                                                  className={'rounded-md border-none bg-secondary mx-auto w-full'}/>
                                </div>
                            </div>

                        </Tab.Panel>
                        <Tab.Panel className={'flex flex-col grow animate-fadein'}>
                            <h1 className={'text-xl ml-6 mt-6'}>
                                Use QuizLand credentials:
                            </h1>
                            <div className={'flex flex-col grow'}>
                                <div className={'m-auto text-xl'}>
                                    Coming soon...<br/>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};


export default Auth;