import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";

const items = [
    {label: 'Your Profile', href: '/profile'},
    {label: 'Settings', href: '/settings'},
    {label: 'Sign out', href: '/signout}'}
]
const Item = (props: {label: string, href: string}) => (
    <Menu.Item>
        {({active}) => (
            <Link href={props.href}
               className={active ? 'bg-gray-100' : '' + 'block px-4 py-2 text-sm text-gray-700'}>
                {props.label}
            </Link>
        )}
    </Menu.Item>
)
const AccountMenu = () => (
    <Menu as="div" className="relative ml-3">
        <div>
            <Menu.Button
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <Image
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
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