import Link from "next/link";
import {FC} from "react";
import Image from 'next/image';

const classes = 'border-2 border-gray-100 round-sm flex p-2'

const Content = ({icon, provider}: {icon?: string, provider: string}) => (<>
        {icon ? <img src={icon} alt={''} className={'max-h-6'}/>: <> </>})
        <div className={'my-auto ml-3'}>
            Continue with {provider}
        </div></>
)
const SocialButton: FC<{ provider: string, icon: string, href?: string, onClick?: () => void }> = ({provider, icon, href, onClick, ...props}) => {


    if (href) return (
        <Link className={classes} {...props} href={href}>
            <Content provider={provider} icon={icon}/>
        </Link>
    )
    else return (
        <button className={classes} onClick={onClick} {...props}>
            <Content provider={provider} icon={icon}/>
        </button>
    )

}


export default SocialButton