// src/components/CourseList/CourseList.tsx
import React from 'react';
import { CourseCardv2 } from "@/features/Courses/components/CourseCardv2/CourseCardv2"
import { Skeleton } from "@/features/Courses/components/CourseCardv2/Skeleton"
import { Button } from "@/components/ui/Button/Button"
import { Course } from "../../hooks/useCoursesData/useCoursesData"; // Import the interface

interface CourseListProps {
    courses: Course[];
    loading: boolean;
    error: string | null;
    onRefresh: () => void;
}

export function CourseList({ courses, loading, error, onRefresh }: CourseListProps) {
    if (loading) {
        return (
            <div data-testid="loading" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(12)].map((_, index) => (
                    <Skeleton id={index} key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div data-testid="error-message" className="flex flex-col gap-4 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-32 text-zinc-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>

                <span><span className="font-semibold">Error:</span> {error}</span>
                <Button onClick={onRefresh} className="default-button flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <p>Refresh</p>
                </Button>
            </div>
        );
    }

    if (courses.length === 0) {
        return <div>No courses available.</div>;
    }

    return (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <li key={course.id}>
                    <CourseCardv2
                        id={course.id}
                        lessons={course.lessons}
                        title={course.title}
                        progress={course.progress}
                        courseLink={course.courseLink}
                    />
                </li>
            ))}
        </ul>
    );
}