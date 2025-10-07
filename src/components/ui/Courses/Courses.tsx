"use client"

import { useCallback, useEffect, useState } from "react"
import { CourseCardv2 } from "../CourseCardv2/CourseCardv2"
import { Button } from "../Button/Button"
import { Pagination } from "../Pagination/Pagination"
import { useDebounce } from "@/hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Skeleton } from "../CourseCardv2/Skeleton"

interface course {
    id: number;
    lessons: number;
    title: string;
    progress: number;
    courseLink: string;
}

export function Courses({ userID }: { userID: string }) {

    const [courses, setCourses] = useState<course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const debouncedSearch = useDebounce(searchTerm, 500);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            /* API response must be structured like this
            {
                    "courses": mockCourses, <---- Array(length = 12) {
                                                            id: 1,
                                                            lessons: 20,
                                                            title: `Course Title`,
                                                            progress: 0,
                                                            courseLink: `/courses/courseid`
                                                        }
                    "totalPages": 12,
                    "currentPage": 1,
            }*/
           
            //mock is used here for demo purposes
            const res = await fetch(`/api/tests/courses?page=${currentPage}&q=${debouncedSearch}`)

            // const res = await fetch(`/api/courses?user=${userID}&page=${currentPage}&q=${debouncedSearch}`) <--real api

            //simulate loading times (comment or remove in production)
            //await new Promise(resolve => setTimeout(resolve, 1000));

            if (!res.ok) throw new Error("Failed to fetch data");

            const json = await res.json();
            setCourses(json.courses)
            setTotalPages(json.total)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }, [userID, debouncedSearch, currentPage])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div data-testid="courses" className="flex flex-col gap-4 relative min-h-96">
            <form action="/" method="get" >
                <div className="relative flex items-center">
                    <MagnifyingGlassIcon className="size-6 absolute left-4" />
                    <input
                        type="search"
                        data-testid="search-bar"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search For Course"

                        className="
                        bg-white py-3 px-4 rounded-3xl border border-zinc-300
                        placeholder-zinc-700 text-sm pl-12 font-normal w-full
                        "
                    />

                </div>
            </form>
            {
                loading ? (
                    <div data-testid="loading" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(12)].map((_, index) => (
                            <Skeleton id={index} key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <div data-testid="error-message" className="flex flex-col gap-4 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="size-32 text-zinc-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>

                        <span><span className="font-semibold">Error:</span> {error}</span>
                        <Button onClick={fetchData} className="default-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <p>Refresh</p>
                        </Button>
                    </div>
                ) : courses.length === 0 ? (
                    <div>No courses available.</div>
                ) : (
                    <div className="flex flex-col gap-8">
                        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                courses.map((course: course) => (
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

                        {/* Pagination */}
                        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                    </div>

                )
            }



        </div>
    )
}