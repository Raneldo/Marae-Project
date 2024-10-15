'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SessionProvider from '@/components/sessionProvider/SessionProvider'

/** Unauthorized page for those who are trying to access /locations/:path where :path is not in their "locationsId" table */

const Main = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [text, setText] = useState('')
  const [buttonText, setButtonText] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      setText('Log in with an account that has the correct authorization')
      setButtonText('Log Out')
    } else {
      setText('Log in to get access')
      setButtonText('Log in')
    }
  }, [status])
  const handleButtonClick = async () => {
    if (status === 'authenticated') {
      await signOut({ redirect: true, callbackUrl: '/login' })
    } else {
      router.push('/login')
    }
  }

  return (
    <div className='mt-36 text-center w-full'>
      <div className='border rounded md:p-8 max-w-[500px] mx-auto space-y-6'>
        <h1 className='border-b pb-6'>You do not have access to this page</h1>
        <p className=''>{text}</p>
        <Button onClick={handleButtonClick} className='mx-auto'>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

const UnauthorizedPage = () => {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  )
}

export default UnauthorizedPage
