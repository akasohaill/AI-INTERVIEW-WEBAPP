
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const RecordingAnswerSection = ({ mockInterviewQuestion, activeQuestion, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState('')
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => {
            setUserAnswer(prev => prev + result?.transcript)
        })
    }, [results])
    useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
            SaveUserAnswer()
        }
    },[userAnswer])

    const StartStopRecording = async () => {
        
        if (isRecording) {
            stopSpeechToText()
        } else {
            startSpeechToText()
        }
    }

    // const SaveUserAnswer = async () => {

    //     console.log(userAnswer);
    //     setLoading(true)
    //     const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestion]?.question + "User Answer:" + userAnswer + ",Depends on question and user answer for give interview questions" + "Please give us the review in 2 to 3 lines in the area of improvement"
    //     const result = await chatSession.sendMessage(feedbackPrompt);
    //     const mockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '')
    //     console.log(mockJsonResponse);

    //     // const JsonFeedbackResp = JSON.parse(mockJsonResponse)

    //     // const resp = await db.insert(UserAnswer).values({
    //     //     mockIdRef: interviewData?.mockId,
    //     //     question: mockInterviewQuestion[activeQuestion]?.question,
    //     //     correctAns: mockInterviewQuestion[activeQuestion]?.answer,
    //     //     userAns: userAnswer,
    //     //     feedbacke: JsonFeedbackResp?.feedback,
    //     //     rating: JsonFeedbackResp?.rating,
    //     //     userEmail: user?.primaryEmailAddress?.emailAddress,
    //     //     createdAt: moment().format('DD-MM-YYYY')
    //     // })
    //     // if (resp) {
    //     //     toast('user answer recorded successfully')
    //     // }
    //     // setUserAnswer('')
    //     // setLoading(false)

    // }
    const SaveUserAnswer = async () => {
        console.log(userAnswer);
        setLoading(true);
    
        try {
            const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestion]?.question + " User Answer:" + userAnswer + ". Depends on the question and user answer for the interview questions. Please give us the review in 2 to 3 lines in the area of improvement. Rating is also required";
            const result = await chatSession.sendMessage(feedbackPrompt);
            const responseText = await result.response.text();
            
            let feedback = '';
            let rating = null;
    
            // Check if the response contains structured text for feedback and rating
            const feedbackMatch = responseText.match(/Feedback:\s*(.*)/i);
            const ratingMatch = responseText.match(/Rating:\s*(\d+)/i);
    
            if (feedbackMatch) {
                feedback = feedbackMatch[1].trim();
            }
            if (ratingMatch) {
                rating = parseInt(ratingMatch[1].trim(), 10);
            }
    
            // If no structured feedback and rating, treat the entire response as feedback
            if (!feedback) {
                feedback = responseText;
            }
    
            const JsonFeedbackResp = { feedback, rating };
    
            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestion]?.question,
                correctAns: mockInterviewQuestion[activeQuestion]?.answer,
                userAns: userAnswer,
                feedbacke: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            });
    
            if (resp) {
                toast('User answer recorded successfully');
                setUserAnswer('')
                setResults([])
            }
            setResults([])
        } catch (error) {
            console.error("Error saving user answer:", error);
            toast('Failed to record user answer');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black p-5 rounded-lg'>
                <Image
                    src={'/webcam.png'}
                    alt='webcam'
                    height={200}
                    width={200}
                    className='absolute'
                />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }}
                />
            </div>
            <Button onClick={StartStopRecording} variant="outline" className="my-10">
                {isRecording ?
                    <h2 className='text-red-500 flex gap-2'><Mic />Stop Recording</h2> :
                    <h2 className='text-primary flex gap-2'><Mic />Record Answer</h2>

                }</Button>
        </div>
    )
}

export default RecordingAnswerSection
