"use client"
import { useCallback, useEffect, useState } from "react"
import { CourseCardv2 } from "../CourseCardv2/CourseCardv2";
import { Button } from "../Button/Button";
import { Skeleton } from "../CourseCardv2/Skeleton";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import NoCourseFound from "@/app/icons/NoCourseFound.svg"

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

            //simulate loading times (comment or remove in production)
            //await new Promise(resolve => setTimeout(resolve, 1000));

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
        <div data-testid="recent-courses" className="min-h-[360px] relative">
            {loading ? (
                <div data-testid="loading" className="grid grid-cols-1 gap-3">
                    {
                        Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton id={i} key={i}/>
                        ))
                    }
                </div>
            ) : error ? (
                <div data-testid="error-message">
                    Error: {error}
                    <Button onClick={fetchData}>Refresh</Button>
                </div>
            ) : course.length === 0 && !loading && !error ? (
                <div data-testid="no-courses" className="flex flex-col gap-4 min-w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image src={NoCourseFound} alt="" className="max-w-32 h-auto self-center m-4" width={128} height={128}></Image>
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-normal"><span className="font-bold">No courses found.</span> Start learning something new today!</p>
                    </div>
                    <Button type="link" href="/dashboard/createnew" className="blue-button self-center">
                        <PlusIcon className="h-6 w-6 mr-2"/>
                        <p>Start a Course</p>
                    </Button>
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