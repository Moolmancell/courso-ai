import { useState, useEffect } from "react";

type Lesson = {
  id: string;
  title: string;
  completed: boolean;
};

type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Course = {
  id: string;
  title: string;
  progress: number;
  lessonCount: number;
  modules: Module[];
};

export function useCourseDetails(courseID: string) {
    const [loading, setLoading] = useState(false);
    const [courseDetails, setCourseDetails] = useState<Course | null>(null);
    const [error, setError] = useState('');

    const fetchFunc = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await fetch(`/api/tests/courses/${courseID}`); // test route
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }
            const json = await res.json();
            setCourseDetails(json);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while loading the course. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFunc();
    }, [courseID]);

    return {
        loading, courseDetails, error, fetchFunc
    }
}