"use client"
import { useEffect, useState, useCallback } from "react"
import { Button } from "../Button/Button"

interface History {
    id?: number,
    title: string,
    timestamp: string
}

export function RecentHistory({userID}: {userID: string}) {

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

    return <div>
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
            <ul>
                {history.map((history: History, idx) => (
                    <li data-testid="history" key={history.id ?? idx}>
                        <h1>{history.title}</h1>
                        <p>{history.timestamp}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
}