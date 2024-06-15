import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({ mockInterviewQuestion, activeQuestion }) => {

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Text to speech is not supported on your window')
        }
    }

    if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
        return <div>No questions available.</div>;
    }

    return (
        <div className='p-5 rounded-lg border my-5'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion.map((question, index) => (
                    <h2
                        className={`p-2 rounded-full text-xs md:text-sm text-center ${activeQuestion === index ? 'bg-primary text-white' : 'bg-secondary '}`}
                    >
                        <strong>Question #{index + 1}</strong>
                    </h2>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>
                <strong>{mockInterviewQuestion[activeQuestion]?.question}</strong>
            </h2>
            <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestion]?.question)} />
            <div className='border rounded-lg bg-blue-100 p-5 mt-20'>
                <h2 className='flex gap-2 items-center text-primary'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className='my-2 text-sm text-primary'>
                    {process.env.NEXT_PUBLIC_INFORMATION} <br /> WE ARE NOT RECORDING YOUR VIDEO AND VOICE, ANYTIME YOU CAN DISABLE THE WEBCAM.
                </h2>
            </div>
        </div>
    )
}

export default QuestionsSection
