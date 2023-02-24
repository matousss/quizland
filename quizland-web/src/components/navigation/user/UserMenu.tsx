import {Menu, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import Link from "next/link";
import UserImage from "./UserImage"

const items = [
    {label: 'Your Profile', href: '/profile'},
    {label: 'Settings', href: '/settings'},
    {label: 'Sign out', href: '/signout'},
]
const Item = ({label, href}:{label: string, href: string}) => (
    <Menu.Item key={label}>
        {({active}) => (
            <Link href={href}
                  className={(active ? 'bg-gray-100 ' : '' )+ 'block px-4 py-2 text-sm text-gray-700'}>
                {label}
            </Link>
        )}
    </Menu.Item>
)
const UserMenu = () => (
    <Menu as="div" className="relative">
        <div>
            <Menu.Button
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none border-2 border-gray-700">
                <span className="sr-only">Open user menu</span>
                <UserImage/>
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
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {items.map((props) => Item(props))}

            </Menu.Items>
        </Transition>
    </Menu>
)

export default UserMenu