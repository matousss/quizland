import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { NavBar } from "../components/navigation/NavBar";
import { NavButton } from "../components/navigation/NavButton";
import Image from "next/image"
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <NavBar>
        <NavButton>
          a
        </NavButton>
        <Link href={'/'}>
        <Image src={'https://dummyimage.com/900x600/00adcc/dd00ff'} alt={'logo'} width={900} height={600} layout={'fill'} className={'object-down-scale h-full inline-block max-w-[10px]'} />
        </Link>

        <NavButton><Link href={'/ahoj'}>Home</Link></NavButton>
      </NavBar>
    </>
  )
}

export default Home
