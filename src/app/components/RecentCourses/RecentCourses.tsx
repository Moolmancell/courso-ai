'use client'
import { useEffect, useState } from "react"
import { CourseCard } from "../CourseCard/CourseCard";  
import { TagVariant } from "../CourseTag/CourseTag.types";

interface CourseInfo { id: number, title: string, progress: number, source: TagVariant, courseLink: string }

export function RecentCourses({userID} : {userID: string}) {
    const [courses, setCourses] = useState<CourseInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                //change to api after
                const res = await fetch("/RecentCoursesMockAPI.json");
                if (!res.ok) throw new Error("Failed to fetch data");

                const json = await res.json();
                setCourses(json);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (courses.length === 0) return <div>No courses found</div>;

    return <div>
        <ul>
            {courses.map((course: CourseInfo) => (
                <li key={course.id}>
                    <CourseCard 
                        title={course.title}
                        progress={course.progress}
                        source={course.source} 
                        courseLink={course.courseLink}
                    />
                </li>
            ))}
        </ul>
    </div>
}