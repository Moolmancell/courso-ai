'use client'

import { XMarkIcon } from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/20/solid"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import { useRouter } from 'next/navigation';

export function CreateCourseForm({ onCancel }: { onCancel: Function }) {

    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'response'>('idle');
    const [formData, setFormData] = useState({ topic: '' });
    const [error, setError] = useState('');
    
    /*
        If the course generation is succesful it should return a JSON with this pattern:
        {
            courseID: (ID of the generated course)
        }
        
        If the topic that the user entered is not valid, it should return a response message
        {
            responseMessage: eg. Please enter a proper topic, Please elaborate further.
        }
        */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            //uses mock api call
            const res = await fetch('/api/create-course', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.ok && data.courseID) {
                setStatus('success');
                setFormData({ topic: '' });
                // Redirect to course, or handle accordingly
                setTimeout(() => {
                    router.push(`/course/${data.courseID}`);
                }, 1000)
            } else if (data.responseMessage) {
                setStatus('response');
                setError(data.responseMessage);
            } else {
                setStatus('error');
                setError('Something went wrong while creating the course.');
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
            setStatus('error');
        }
    };
    return (
        <div className="fixed top-0 z-50 left-0 w-full h-full bg-black/50 flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-white border border-zinc-300 rounded-3xl p-4 flex flex-col gap-8 dialog-popout">
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold text-xl">Create Course</h1>
                    <button type="button" className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => onCancel()} data-testid="x-button" disabled={status === 'submitting'}>
                        <XMarkIcon className="size-6" />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="topic" className="text-sm font-medium">Topic</label>
                        <input type="text" id="topic" name="topic" placeholder="What do you want to learn?"
                            className="bg-white py-3 px-4 rounded-3xl border border-zinc-300
                                placeholder-zinc-700 text-sm font-normal w-full"
                            required
                            onChange={(e) => setFormData({ topic: e.target.value })}
                            disabled={status === 'submitting'}
                        />
                    </div>
                    <div className="bg-zinc-100 rounded-3xl px-3 py-4 border border-zinc-300 flex flex-row gap-4 items-center">
                        <InformationCircleIcon className="size-6 text-zinc-400" />
                        <p className="text-sm font-normal text-zinc-600">Try to be detailed as much as possible to get better results.</p>
                    </div>
                    {
                        status === 'error' ? (
                            <div className="bg-red-100 rounded-3xl px-3 py-4 border border-red-300 flex flex-row gap-4 items-center">
                                <ExclamationTriangleIcon className="size-6 text-red-400" />
                                <p className="text-sm font-normal text-red-600">{error || 'An unexpected error occurred'}</p>
                            </div>
                        ) : status === 'submitting' ? (
                            <div className="bg-blue-100 rounded-3xl px-3 py-4 border border-blue-300 flex flex-row gap-4 items-center">
                                <InformationCircleIcon className="size-6 text-blue-400" />
                                <p className="text-sm font-normal text-blue-600">Processing...</p>
                            </div>
                        ) : status === 'success' ? (
                            <div className="bg-green-100 rounded-3xl px-3 py-4 border border-green-300 flex flex-row gap-4 items-center">
                                <InformationCircleIcon className="size-6 text-green-400" />
                                <p className="text-sm font-normal text-green-600">Course Created. Redirecting...</p>
                            </div>
                        ) : status === 'response' ? (
                            <div className="bg-blue-100 rounded-3xl px-3 py-4 border border-blue-300 flex flex-row gap-4 items-center">
                                <InformationCircleIcon className="size-6 text-blue-400" />
                                <p className="text-sm font-normal text-blue-600">{error}</p>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <button type="button" className="default-button" onClick={() => onCancel()} disabled={status === 'submitting'}>Cancel</button>
                    <button type="submit" className="blue-button flex items-center gap-3" disabled={status === 'submitting'} data-testid="create-course">
                        <PlusIcon className="size-6"></PlusIcon>
                        <span>Create Course</span>
                    </button>
                </div>
            </form>
        </div>
    )
}