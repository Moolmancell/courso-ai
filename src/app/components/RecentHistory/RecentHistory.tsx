"use client"
import { useEffect, useState, useCallback } from "react"
import { Button } from "../Button/Button"

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
            const res = await fetch("/RecentHistoryMockAPI.json");
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

    return <div className="bg-white border border-zinc-300 rounded-3xl p-4 relative">
        <div className="w-4 h-full absolute top-0 flex flex-row justify-center items-center rounded-full py-4 z-0">
            <div className="bg-zinc-200 w-0.5 h-full"></div>
        </div>
        {loading ? (
            <div data-testid="loading">loading...</div>
        ) : error ? (
            <div data-testid="error-message">
                Error: {error}
                <Button onClick={fetchRecentHistory}>Refresh</Button>
            </div>
        ) : history.length === 0 ? (
            <div data-testid="no-recent-history">No recent history yet.</div>
        ) : (
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