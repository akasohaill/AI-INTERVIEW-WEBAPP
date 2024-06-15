'use client'

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'


const Feedback = ({ params }) => {
    const [feedback, setFeedback] = useState([])
    const router = useRouter();
    useEffect(() => {
        GetFeedback();
    }, [])
    const GetFeedback = async () => {
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);

        console.log(result)
        setFeedback(result)
    }

    return (
        <div className='p-10'>
            {feedback?.length == 0 ?
                <h2 className='text-xl text-gray-600 font-medium'>No Interview Feedback Record is found</h2> : <>
                    <h2 className='text-2xl font-bold text-green-500'>Congratulations!!</h2>
                    <h2 className='font-bold text-2xl'>Here is your interview feedback.</h2>
                    <h2 className='text-primary my-3 text-lg'> <strong>Your overall interview review</strong></h2>

                    <h2 className='text-sm  text-gray-500'>Find your interview questions with correct answer , Your answer and feedback for the improvement</h2>
                    {feedback && feedback.map((item, index) => (
                        <Collapsible key={index} className='mt-10'>
                            <CollapsibleTrigger className='p-2 rounded-lg bg-secondary my-2 text-left flex justify-between gap-7'>
                                {item.question} <ChevronsUpDown className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='border rounded-lg p-2 bg-red-50 text-sm text-red-900'><strong>Your Answer : </strong>{item.userAns}</h2>
                                    <h2 className='border rounded-lg p-2 bg-green-50 text-sm text-green-900'><strong>Correct Answer : </strong>{item.correctAns}</h2>
                                    <h2 className='border rounded-lg p-2 bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedbacke}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))
                    }
                </>
            }

            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback
