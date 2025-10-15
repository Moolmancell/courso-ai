import { useState, useEffect, useCallback } from "react";
import { Course } from "../types/course"; 

interface UseRecentCoursesResult {
    courses: Course[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useRecentCourses(userID: string): UseRecentCoursesResult {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null); // Clear previous errors
            
            const res = await fetch(`/RecentCoursesMockApi.v2.json`); 


            if (!res.ok) {
                throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
            }
            
            const json: Course[] = await res.json();
            setCourses(json);
        } catch (err) {
            console.error("Fetch error:", err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [userID]); 

    useEffect(() => { 
        fetchData();
    }, [fetchData]); // Run initial fetch

    return { 
        courses, 
        loading, 
        error, 
        refetch: fetchData 
    };
}