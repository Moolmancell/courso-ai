// src/hooks/useCoursesData.ts (or wherever you put your hooks)
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // Assuming this is correct

// Re-export the interface for consumption
export interface Course {
    id: number;
    lessons: number;
    title: string;
    progress: number;
    courseLink: string;
}

interface FetchResponse {
    courses: Course[];
    total: number; // Renamed from totalPages to total for consistency with API usage
}

export function useCoursesData(userID: string, currentPage: number, searchTerm: string) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    // currentPage and searchTerm are passed in to allow the parent to control them

    // Apply debounce to the search term
    const debouncedSearch = useDebounce(searchTerm, 500);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null); // Clear previous errors
            const fetchUrl = `/api/tests/courses?page=${currentPage}&q=${debouncedSearch}`;
            // const realApiUrl = `/api/courses?user=${userID}&page=${currentPage}&q=${debouncedSearch}`;
            const res = await fetch(fetchUrl);
            // Simulate loading times (comment or remove in production)
            // await new Promise(resolve => setTimeout(resolve, 1000));
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch data: ${res.status} - ${errorText}`);
            }

            const json: FetchResponse = await res.json();
            setCourses(json.courses);
            setTotalPages(json.total); // Set total pages
        } catch (err) {
            console.error("Fetch Error:", err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [userID, debouncedSearch, currentPage]); // Dependencies for useCallback

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        courses,
        loading,
        error,
        totalPages,
        fetchData, // Expose fetchData for refresh button
    };
}