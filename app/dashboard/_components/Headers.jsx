'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Headers = () => {
     
    const path=usePathname()
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex items-center justify-between p-4 bg-secondary shadow-sm'>
      <Image
      src={'/logo.svg'}
      width={160}
      height={100}
      alt='logo'
      />
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard' && 'text-primary font-bold'}
            `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/questions' && 'text-primary font-bold'}
            `}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/upgrade' && 'text-primary font-bold'}
            `}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/how' && 'text-primary font-bold'}
            `}>How it works?</li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Headers
