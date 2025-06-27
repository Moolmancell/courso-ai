"use client"

import { useCallback, useEffect, useState } from "react"
import { CourseCardv2 } from "../CourseCardv2/CourseCardv2"
import { Button } from "../Button/Button"

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

    const [totalCourses, setTotalCourses] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/courses?page=${currentPage}&q=${searchTerm}`) 

            //simulate loading times (comment or remove in production)
            //await new Promise(resolve => setTimeout(resolve, 1000));

            if (!res.ok) throw new Error("Failed to fetch data");

            const json = await res.json();
            setCourses(json.courses)
            setTotalCourses(json.total)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }, [userID, searchTerm])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div data-testid="courses">
            <form action="/" method="get" >
                <input type="text" data-testid="search-bar" />
            </form>
            {
                loading ? (
                    <div data-testid="loading" >loading</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : courses.length === 0 ? (
                    <div>No courses available.</div>
                ) : (
                    <div>
                        <ul className="">
                            {
                                courses.slice(0, 12).map((course: course) => (
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
                        <div data-testid="pagination">
                            
                        </div>

                    </div>

                )
            }



        </div>
    )
}