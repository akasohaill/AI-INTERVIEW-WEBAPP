'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'


const AddNewInterview = () => {
    const [open, setOpen] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExp, setJobExp] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([])
    const { user } = useUser()
    const router=useRouter()

    const onSubmitHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log(jobDesc, jobExp, jobPosition);

        const InputPrompt = 'Job Role: ' + jobPosition + 'Job Description: ' + jobDesc + 'job experience: ' + jobExp + ' Depends on these give me 5 interview questions and answers in JSON format. Give the question and answer field on json.'

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '')
        // console.log(JSON.parse(MockJsonResponse))
        setJsonResponse(MockJsonResponse)

        if (MockJsonResponse) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp:MockJsonResponse,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExp,
                    createdBt: user?.primaryEmailAddress?.emailAddress,
                    createdAy: moment().format('DD-MM-YYYY')
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted Id", resp)
                if(resp){
                    setOpen(false)
                    // console.log(resp);
                    router.push('/dashboard/interview/'+resp[0]?.mockId)
                }

        }else{
            console.log('Error');
        }
        setLoading(false)
    }

    return (
        <div>
            <div onClick={() => setOpen(true)} className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer'>
                <h2 className='font-bold text-lg text-center'>+ Add New </h2>
            </div>
            <Dialog open={open}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell me more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmitHandler}>
                                <div>
                                    <h2>Add details about your job position/role , job description and about your experience.</h2>
                                </div>
                                <div className='mt-7 my-3'>
                                    <label>Job Role</label>
                                    <Input placeholder="Ex. Full Stack Developer" required
                                        onChange={(e) => setJobPosition(e.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Job Description</label>
                                    <Textarea placeholder="Ex. React, Next , MySql etc..." required onChange={(e) => setJobDesc(e.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Work Experience</label>
                                    <Input placeholder="5" type='number' max='50' required
                                        onChange={(e) => setJobExp(e.target.value)} />
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type='button' onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                                    <Button type='submit' disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' />'Generating from ai'
                                            </> :
                                            'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview
