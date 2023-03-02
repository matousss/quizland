import {FC} from "react";

const classes = 'border-2 border-gray-100 round-sm flex p-2'

const Content = ({icon, provider}: {icon?: string, provider: string}) => (<>
        {icon ? <img src={icon} alt={''} className={'max-h-6 pr-3'}/>: <div className={'pr-9'}> </div>}
        <div className={'my-auto pl-3'}>
            {provider}
        </div></>
)

interface SocialButtonProps { provider: string, icon?: string, href?: string, onClick?: () => void, className?: string }
const SocialButton: FC<SocialButtonProps> = ({provider, icon, href, onClick, className='', ...props}) => {
    className += ' ' + classes
    if (icon) className += ' divide-x divide-black'

    if (href) return (
        <a className={className} {...props} href={href}>
            <Content provider={provider} icon={icon}/>
        </a>
    )
    else return (
        <button className={className} onClick={onClick} {...props}>
            <Content provider={provider} icon={icon}/>
        </button>
    )

}


export default SocialButton