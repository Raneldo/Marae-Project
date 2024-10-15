'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './Navbar.css'
import logo from '@/assets/logo.png'
import menu_icon from '@/assets/menu-icon.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import SessionProvider from '@/components/sessionProvider/SessionProvider'

const MainNavbar = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [mobileMenu, setMobileMenu] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    setAuthenticated(status === 'authenticated')
  }, [status, session])

  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true)
  }

  const handleAuthentication = async () => {
    if (status === 'authenticated') {
      await signOut({ redirect: true , callbackUrl: "/"})
    } else {
      router.push('/login')
    }
  }

  return (
    <nav className={`cont ${pathname === '/' ? '' : 'bg-primary'}`}>
      <Link href='/'>
        <Image src={logo} alt='asdf' className='logo' priority />
      </Link>
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/locations'>Locations</Link>
        </li>
        {authenticated && (
          <li>
            <Link href={`/locations/${session.user.locationId}`}>My Marae</Link>
          </li>
        )}
        <li>
          <Link href='/about-us'>About us</Link>
        </li>
        <li>
          <Link href='/contact'>Contact us</Link>
        </li>
        <li>
          <Button
            onClick={handleAuthentication}
            className='btn hover:text-white'
          >
            {authenticated ? 'Sign out' : 'Log in'}
          </Button>
        </li>
      </ul>
      <Image
        src={menu_icon}
        alt=''
        className='menu-icon'
        onClick={toggleMenu}
      />
    </nav>
  )
}

const Navbar = () => {
  return (
    <SessionProvider>
      <MainNavbar />
    </SessionProvider>
  )
}
export default Navbar
