"use client"
import { useEffect, useState, useCallback } from "react"
import { Button } from "../Button/Button"
import { Skeleton } from "./Skeleton"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

interface History {
    id?: number,
    title: string,
    timestamp: string
}

export function RecentHistory({ userID }: { userID: string }) {

    const [history, setHistory] = useState<History[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecentHistory = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            //remove
            await new Promise(resolve => setTimeout(resolve, 5000));

            //change to real api
            const res = await fetch("/RecentHistory");
            if (!res.ok) throw new Error("Failed to fetch data");

            const json = await res.json();
            setHistory(json);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRecentHistory();
    }, [fetchRecentHistory])

    return <div className="bg-white border border-zinc-300 rounded-3xl p-4 relative min-h-80">
        <div className={`w-4 h-full absolute top-0 flex flex-row justify-center items-center rounded-full py-4 z-0 ${
            //hide line if...
            history.length <= 0 
            
            ? "hidden" : ""}`}>
            <div className="bg-zinc-200 w-0.5 h-full"></div>
        </div>
        {loading ? (
            <div data-testid="loading">
                <div className="w-4 animate-pulse h-full absolute top-0 flex flex-row justify-center items-center rounded-full py-4 z-0">
                    <div className="bg-zinc-200 w-0.5 h-full"></div>
                </div>

                {
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i}/>
                    ))
                }
            </div>
        ) : error ? (
            <div data-testid="error-message" className="flex flex-col gap-2 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="size-16 text-zinc-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>

                <span><span className="font-semibold">Error:</span> {error}</span>
                <Button onClick={fetchRecentHistory} className="default-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                   <p>Refresh</p> 
                </Button>
            </div>
        ) : history.length === 0 ? (
            <div data-testid="no-recent-history" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">No recent history yet.</div>
        ): (
            <ul className="relative z-[5] flex flex-col gap-2">
                {history.map((history: History, idx) => (
                    <li data-testid="history" key={history.id ?? idx} className="flex flex-row gap-4 mb-6">
                        <div
                            className="flex flex-col gap-0 items-center justify-start self-stretch shrink-0 relative"
                        >
                            <div className="blob shrink-0 w-4 h-4 relative">
                                <div
                                    className="bg-blue-200 rounded-[50%] w-[100%] h-[100%] absolute right-[0%] left-[0%] bottom-[0%] top-[0%]"
                                ></div>
                                                                <div
                                    className={`bg-blue-200 rounded-[50%] w-[100%] h-[100%] absolute right-[0%] left-[0%] bottom-[0%] top-[0%] ${idx === 0 ? 'animate-ping' : ''}`}
                                ></div>

                                <div
                                    className="bg-blue-400 rounded-[50%] w-[66.67%] h-[66.67%] absolute right-[16.67%] left-[16.67%] bottom-[16.67%] top-[16.67%]"
                                ></div>
                            </div>
                            <div className="bg-zinc-200 flex-1 w-0.5 relative"></div>
                        </div>

                        <div className="flex flex-col gap-2 self-start">
                            <h1 className="line-clamp-2 text-base/6 font-medium">
                                {history.title}
                            </h1>
                            <p className="text-sm font-bold text-zinc-500">{new Date(history.timestamp).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
}