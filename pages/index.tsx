import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { NavBar } from "../src/components/navigation/NavBar";
import { NavButton } from "../src/components/navigation/NavButton";
import Image from "next/image"
import Link from 'next/link';
import {NavLink} from "../src/components/navigation/NavLink";
import React from "react";


const Home: NextPage = () => {
  return (
    <>
      <NavBar>
        <NavButton>
          a
        </NavButton>
        {/*<Link href={'/'}>*/}
        {/*<Image src={'https://dummyimage.com/900x600/00adcc/dd00ff'} alt={'logo'} width={900} height={600} layout={'fill'} className={'object-down-scale h-full inline-block max-w-[10px]'} />*/}
        {/*</Link>*/}

        <NavButton>Blank button</NavButton>
        <NavLink title={'home'} href={'/ahoj'}/>
        <NavLink title={'test'} href={'/test'}/>

      </NavBar>
    </>
  )
}

export default Home
