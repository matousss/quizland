export default function About() {

    return (
        <div className={'w-full h-full bg-primary flex flex-col'}>
            <img src={'/logo_big.svg'} className={'w-1/2 mx-auto'}/>
            <a href={'/auth'} className={'text-[2rem] text-white hover:bg-[#009fe2] bg-[#0054bb] duration-200 rounded-lg p-5 mt-24 mx-auto'}>
                Join now!

            </a>


        </div>
    )
}