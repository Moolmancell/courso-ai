"use client"
import { useCallback, useEffect, useState } from "react"
import { CourseCardv2 } from "../../../Courses/components/CourseCardv2/CourseCardv2";
import { Button } from "../../../../components/ui/Button/Button";
import { Skeleton } from "../../../Courses/components/CourseCardv2/Skeleton";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import NoCourseFound from "@/assets/icons/NoCourseFound.svg";
import { useRecentCourses } from "../../hooks/useRecentCourses";
import { Course } from "../../types/course";

export function RecentCoursesv2({userID}:{userID: string}) {

    const { 
        courses, 
        loading, 
        error, 
        refetch 
    } = useRecentCourses(userID); 

    return (
        <div data-testid="recent-courses" className="min-h-[360px] relative">
            {loading ? (
                <div data-testid="loading" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {
                        Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton id={i} key={i}/>
                        ))
                    }
                </div>
            ) : error ? (
                <div data-testid="error-message" className="flex flex-col gap-4 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-32 text-zinc-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>

                <span><span className="font-semibold">Error:</span> {error}</span>
                <Button onClick={refetch} className="default-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                   <p>Refresh</p> 
                </Button>
            </div>
            ) : courses.length === 0 && !loading && !error ? (
                <div data-testid="no-courses" className="flex flex-col gap-4 min-w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image src={NoCourseFound} alt="No Course Found" className="max-w-32 h-auto self-center m-4" width={128} height={128}></Image>
                    <div className="flex flex-col gap-2">
                        <p className="text-base font-normal"><span className="font-bold">No courses found.</span> Start learning something new today!</p>
                    </div>
                    <Button type="link" href="/dashboard/createnew" className="blue-button self-center">
                        <PlusIcon className="h-6 w-6 mr-2"/>
                        <p>Start a Course</p>
                    </Button>
                </div>
            ) : (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {
                        courses.map((course: Course) => (
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