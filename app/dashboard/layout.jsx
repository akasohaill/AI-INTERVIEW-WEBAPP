import React from 'react'
import Headers from './_components/Headers'
import { Toaster } from '@/components/ui/sonner'

const DashboardLayout = ({children}) => {
  return (
    <div>
      <Headers/>
      <div className='mx-5 md:mx-20 lg:mx-36 '>
      {children}
      <Toaster />
      </div>
    </div>
  )
}

export default DashboardLayout