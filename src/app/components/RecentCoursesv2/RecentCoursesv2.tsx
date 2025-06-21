"use client"
import { useCallback, useEffect, useState } from "react"
import { CourseCardv2 } from "../CourseCardv2/CourseCardv2";
import { Button } from "../Button/Button";

interface course {
    id: number;
    lessons: number;
    title: string;
    progress: number;
    courseLink: string;
}

export function RecentCoursesv2({userID}:{userID: string}) {

    const [course, setCourse] = useState<course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`/RecentCoursesMockApi.v2.json`)
            if (!res.ok) throw new Error("Failed to fetch data");
            
            const json = await res.json();
            setCourse(json)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }, [userID])

    useEffect(() => { 
        fetchData();
    }, [fetchData])

    return (
        <div data-testid="recent-courses">
            {loading ? (
                <div data-testid="loading">loading...</div>
            ) : error ? (
                <div data-testid="error-message">
                    Error: {error}
                    <Button onClick={fetchData}>Refresh</Button>
                </div>
            ) : course.length === 0 && !loading && !error ? (
                <div data-testid="no-courses">
                    <h1>No courses found. Start learning something new today!</h1>
                    <Button type="link" href="/dashboard/createnew">Start a Course</Button>
                </div>
            ) : (
                <ul className="grid grid-cols-1 gap-3">
                    {
                        course.map((course: course) => (
                            <li key={course.id}>
                                <CourseCardv2
                                    id={course.id}
                                    lessons={course.lessons}
                                    title={course.title}
                                    progress={course.progress}
                                    courseLink={course.courseLink}
                                />
                            </li>
                        ))
                    }   
                </ul>
            )}
        </div>
    )
}