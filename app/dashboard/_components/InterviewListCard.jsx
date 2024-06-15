import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewListCard = ({ interview }) => {
    const router=useRouter();

    const feedy=()=>{
        router.push('/dashboard/interview/'+interview.mockId+'/feedback')
    }
    const toStart=()=>{
        router.push('/dashboard/interview/'+interview.mockId)
    }

    return (
        <div className='border shadow-sm rounded-lg p-3 w-full'>
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-700'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-500'>{interview?.createdAy}</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button onClick={feedy} variant="outline"  size='sm'className="w-full">Feedback</Button>
                <Button onClick={toStart} size='sm' className="w-full">Start</Button>
            </div>
        </div>
    )
}

export default InterviewListCard
