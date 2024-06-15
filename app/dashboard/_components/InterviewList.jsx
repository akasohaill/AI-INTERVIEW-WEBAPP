'use client'

import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewListCard from './InterviewListCard'

const InterviewList = () => {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.createdBt,user.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))

        console.log(result)
        setInterviewList(result)
    }

  return (
    <div>
      <h2 className='text-xl font-medium'>Previous Interview List</h2>

      <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
        {interviewList&&interviewList.map((interview,index)=>(
            <InterviewListCard 
            key={index}
            interview={interview}
            />
        ))}
      </div>
    </div>
  )
}

export default InterviewList
