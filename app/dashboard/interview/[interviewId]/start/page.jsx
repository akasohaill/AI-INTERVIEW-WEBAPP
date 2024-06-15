'use client'

import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordingAnswerSection from './_components/RecordingAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({ params }) => {
    const [interviewData, setInterviewData] = useState(null)
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(0)

    useEffect(() => {
        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp)
                console.log(jsonMockResp)
                setMockInterviewQuestion(jsonMockResp)
                setInterviewData(result[0])
            }
        } catch (error) {
            console.error('Error fetching interview details:', error)
        }
    }

    const handleNext = () => {
        if (activeQuestion < mockInterviewQuestion.length - 1) {
            setActiveQuestion(activeQuestion + 1)
        }
    }

    const handlePrevious = () => {
        if (activeQuestion > 0) {
            setActiveQuestion(activeQuestion - 1)
        }
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Question Section */}
                <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestion={activeQuestion} />
                {/* Video/voice recording */}
                <RecordingAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestion={activeQuestion} interviewData={interviewData} />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestion > 0 && <Button onClick={handlePrevious}>Previous Question</Button>}
                {activeQuestion < mockInterviewQuestion.length - 1 && <Button onClick={handleNext}>Next Question</Button>}
                <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>{activeQuestion === mockInterviewQuestion.length - 1 && <Button>End Interview</Button>}</Link>
                
            </div>
        </div>
    )
}

export default StartInterview
