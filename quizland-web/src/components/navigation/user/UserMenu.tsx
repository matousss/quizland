import {Menu, Transition} from "@headlessui/react";
import React, {FC, Fragment} from "react";
import Link from "next/link";
import UserImage from "./UserImage"
import {User} from "#types";

const items = [
    {label: 'Your Profile', href: '/profile'},
    {label: 'Settings', href: '/settings'},
    {label: 'Sign out', href: '/signout'},
]
const Item = ({label, href}:{label: string, href: string}) => (
    <Menu.Item key={label} className={'group'} as={'div'}>
        {({active}) => (
            <Link href={href}
                  className={(active ? 'bg-gray-500 text-white' : 'text-contrast' )+ ' block px-4 py-2 text-sm group:hover:bg-primary'}>
                {label}
            </Link>
        )}
    </Menu.Item>
)
const UserMenu: FC<{user: User}> = ({user}) => (
    <Menu as="div" className="relative">
        <div>
            <Menu.Button
                className="flex rounded-full bg-white text-sm focus:outline-none border-2 border-middle">
                <span className="sr-only">Open user menu</span>
                <UserImage src={user.image as string | undefined}/>
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                className="absolute right-0 z-10 mt-2 w-36 origin-top-right border border-secondary bg-primary divide-y divide-secondary rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {items.map((props) => Item(props))}

            </Menu.Items>
        </Transition>
    </Menu>
)

export default UserMenu