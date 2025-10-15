import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react'

type LessonContent =
    | { type: "heading"; id: string; text: string }
    | { type: "paragraph"; id: string; text: string }
    | { type: "code"; id: string; text: string, lang: string }
    | { type: "image"; id: string; src: string; alt?: string }
    | { type: "video"; id: string; src: string; searchTerm?: string }
    | { type: "divider"; id: string }
    | { type: "orderedlist"; id: string; items: string[] }
    | { type: "unorderedlist"; id: string; items: string[] };

interface Lesson {
    id: string;
    title: string;
    previousLessonID: string | null;
    nextLessonID: string | null;
    completed: boolean;
    content: LessonContent[];
}

export function useLessonContent() {
    const params = useParams<{ courseID: string; lessonID: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `/api/tests/courses/${params.courseID}/${params.lessonID}`
            );
            //test route change later
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const json = await res.json();
            setLesson(json);
        } catch (error) {
            console.error("Error fetching lesson data:", error);
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setLoading(false);
        }
    }, [params.courseID, params.lessonID]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        lesson, loading, error, fetchData
    }

}
