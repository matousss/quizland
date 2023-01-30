import {NavButton} from "./NavButton";
import Link from "next/link";
import type {UrlObject} from "url";
import React from "react";


interface Props {
    title: string;
    href: string | UrlObject;
}

interface RefProps {
    title?: string;
    onClick?: any;
    href?: any;
}

const NavButtonRef = React.forwardRef(({title, onClick, href}: RefProps, props) =>

        <a onClick={onClick} href={href}>
            <NavButton {...props}> {title}</NavButton>
        </a>
    );

export const NavLink = ({title, href}: Props) => {
    return (

        <Link href={href} legacyBehavior passHref className={"cursor-pointer"}>
            <NavButtonRef title={title}/>
        </Link>

    )
}