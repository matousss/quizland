import Link from "next/link";

export default function About() {

    return (
        <div className={'w-full h-full bg-primary divide-y-8 divide-secondary'}>
            <div className={'w-full flex flex-col md:flex-row'}>
                <div className={'grow m-5 flex flex-col'}>
                    <h1 className={'text-lg pb-4'}>
                        We are everywhere
                    </h1>
                    <p>
                        There is no place where we are not.
                        You cannot escape us.
                    </p>
                    <div className={'flex pt-10'}>
                        <Link href={'/auth'} className={'text-xxl text-white bg-green-900 rounded-md p-5 m-auto'}>
                                Join us!

                        </Link>
                    </div>
                </div>
                <div className={'w-4/5 sm:w-3/5 md:w-2/5 m-auto md:m-5'}>
                    <img src={'/assets/stonks.png'} alt={'Stonks'} className={'rounded-xl'}/>
                </div>
            </div>


        </div>
    )
}