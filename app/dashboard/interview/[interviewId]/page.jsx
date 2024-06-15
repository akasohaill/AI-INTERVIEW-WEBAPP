'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

const page = ({ params }) => {
    const [interviewData, setInterviewData] = useState([])
    const [enableWebCam, setEnableWebCam] = useState(false)
    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, [])

// For Getting all the data of the interview
    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        setInterviewData(result[0])
    }

    return (
        <div className='my-10'>
            <h2 className='text-2xl font-bold'>Let's get started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col rounded-lg p-5 border '>
                        <h2 className='text-sm md:text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
                        <h2 className='text-sm md:text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData.jobDesc}</h2>
                        <h2 className='text-sm md:text-lg'><strong>Work Experience:</strong>{interviewData.jobExperience}</h2>
                    </div>
                    <div className='p-5 rounded-lg border border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION} <br /> NOTE: WE ARE NOT RECORDING YOUR VIDEO AND VOICE, ANYTIME YOU CAN DISABLE THE WEBCAM.</h2>
                    </div>
                </div>
                <div>{
                    enableWebCam ?
                        <>
                            <Webcam
                                mirrored={true}
                                onUserMedia={() => setEnableWebCam(true)}
                                onUserMediaError={() => setEnableWebCam(false)}
                                style={{
                                    height: 300,
                                    width: 300
                                }}
                            />
                        </> : <>
                            <div className='flex flex-1 flex-col'>
                                <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                                <Button variant='ghost' onClick={() => setEnableWebCam(true)}>Enable Webcam and mircrophone</Button>
                            </div>
                        </>
                }
                </div>
            </div>
            <div className='flex justify-end items-end mt-5'> 
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default page
