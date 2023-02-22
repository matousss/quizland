import {Disclosure, Menu, Popover, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {Component, FC, PropsWithChildren} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import UserMenu from "./user";

interface Item {
    label: string
    href: string

}

interface Submenu {
    subMenu?: Array<Item>
}

const navigation: Array<Item & Submenu> = [
    {label: 'Library', href: '/dashboard'},
    {label: 'Browse', href: '/browse'},
    {
        label: 'Create', href: '/create', subMenu: [
            {label: 'Card set', href: '/create/cardset'},
            {label: 'Quiz', href: '/create/quiz'}
        ]
    },
    {label: 'About', href: '/about'},
]

const Logo = () => (
    <Link href={'/'} className={"flex flex-shrink-0 items-center"}>
        <img
            className={"block h-8 w-auto"}
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
        />
    </Link>
)

const ToggleButton = ({open}: { open: boolean }) => (
    <Disclosure.Button
        className={"inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"}>
        {open ? (
            <XMarkIcon className={"block h-6 w-6"} aria-hidden/>
        ) : (
            <Bars3Icon className={"block h-6 w-6"} aria-hidden/>
        )}
    </Disclosure.Button>
)

const SmallNavBarItem: FC<{ active: boolean } & Item> = ({active, ...item}) => (<Disclosure.Button
    key={item.label}
    as={Link}
    href={item.href}
    className={
        active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' + 'block px-3 py-2 rounded-md text-base font-medium'
    }
    aria-current={active ? 'page' : undefined}
>
    {item.label}
</Disclosure.Button>)

// menu for mobile
const SmallNavBar = ({pathName}: { pathName: string | null }) => (
    <Transition
        enter="transition ease-in duration-150"
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 translate-y-1"
        leave="transition ease-out duration-150"
        leaveFrom="opacity-100 translate-y-1"
        leaveTo="opacity-0 translate-y-0"
    >
        <Disclosure.Panel className={"sm:hidden"}>
            <div className={"space-y-1 px-2 pt-2 pb-3"}>
                {
                    navigation.map((item) => {
                        let active = item.href === pathName

                        return (
                            <SmallNavBarItem key={item.label} active={active} {...item}/>
                        )
                    })
                }
            </div>
        </Disclosure.Panel>
    </Transition>
)

interface BodyBtnProps {
    active: boolean, label: string
    onMouseEnter?: () => void, onMouseLeave?: () => void
}
const BodyBtn: FC<BodyBtnProps & PropsWithChildren> = ({active, ...props}) => (
    <div
        key={props.label}
        className={
            active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' +
                ' px-3 py-2 rounded-md text-sm font-medium flex transition duration-150 ease-in-out'
        }
        aria-current={active ? 'page' : undefined}
        {...props}
    >
        {props.label}
        {props.children}
    </div>
)

const BodyBtnLink: FC<{ href: string } & BodyBtnProps> = ({href, ...props}) => (
    <Link href={href}>
        <BodyBtn {...props}/>
    </Link>
)

const BodyMenu = ({active, items, ...props}: Item & { active: boolean, items: Array<Item> }) => {
    return (
        <Popover className={"realtive m-auto"}>

            <>
                <Popover.Button>
                    <BodyBtn active={active} {...props}>
                        <ChevronDownIcon
                            className={'h-5 w-5 ui-open:rotate-180 ui-open:transform transition duration-150 ease-in-out'}
                            aria-hidden
                        />
                    </BodyBtn>
                </Popover.Button>
                <Transition
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 translate-y-0"
                    enterTo="opacity-100 translate-y-1"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-1"
                    leaveTo="opacity-0 translate-y-0"
                >

                    <Popover.Panel>
                        <div
                            className={
                                'absolute z-50 rounded-md text-sm font-medium mt-.5 shadow-md bg-gray-800 border-2 border-gray-700 divide-y divide-gray-100 flex flex-col text-gray-300'}
                        >


                            {items.map((item) => {
                                return (
                                    <Link href={item.href} key={`${props.label}-${item.label}`}
                                          className={'px-3 py-2 w-full hover:bg-gray-700 hover:text-white'}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </div>

                    </Popover.Panel>
                </Transition>
            </>

        </Popover>
    )
}


const NavBarBody = ({
                        pathName, open
                    }: {
    pathName: string | null, open
        :
        boolean
}) => {
    return (
        <div className={"m w-full px-2 sm:px-6 lg:px-8"}>
            <div className={"relative flex h-16 items-center justify-between"}>
                <div className={"absolute inset-y-0 left-0 flex items-center sm:hidden"}>
                    <ToggleButton open={open}/>
                </div>
                <div className={"flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"}>
                    <Logo/>
                    <div className={"hidden sm:ml-6 sm:block"}>
                        <div className={"flex space-x-4"}>
                            {navigation.map((item) => {
                                let active = item.href === pathName;
                                if (item.subMenu === undefined) {
                                    return <BodyBtnLink {...item} active={active} key={item.label}/>;
                                }

                                const {subMenu, ...props} = item;

                                return (<BodyMenu active={active} items={subMenu} {...props} key={item.label}/>)
                            })}


                        </div>
                    </div>

                    <div className={'absolute right-0'}>
                        <UserMenu/>
                    </div>
                </div>

            </div>
        </div>)

}


export {
    NavBar
}

const NavBar = () => {
    const pathName = usePathname()

    return (
        <Disclosure as="nav" className={"bg-gray-800"}>
            {({open}) => (
                <>
                    <NavBarBody pathName={pathName} open={open}/>

                    <SmallNavBar pathName={pathName}/>
                </>
            )}
        </Disclosure>
    )
}

