'use client'

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/app/components/Button/Button";

type LessonContent =
    | { type: "heading"; id: string; text: string }
    | { type: "paragraph"; id: string; text: string }
    | { type: "code"; id: string; text: string }
    | { type: "image"; id: string; src: string; alt?: string }
    | { type: "video"; id: string; src: string; searchTerm?: string }
    | { type: "divider"; id: string }
    | { type: "orderedlist"; id: string; items: string[] }
    | { type: "unorderedlist"; id: string; items: string[] };

interface Lesson {
    id: string;
    title: string;
    completed: boolean;
    content: LessonContent[];
}

export default function Page() {
    const params = useParams<{ courseID: string; lessonID: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `/api/courses/${params.courseID}/${params.lessonID}`
            );
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const json = await res.json();
            console.log("Fetched lesson data:", json);
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

    return (
        <div>
            {loading ? (
                <div data-testid="loading">Loading...</div>
            ) : error ? (
                <div data-testid="error">Error: {error}</div>
            ) : lesson ? (
                <div>
                    <h1 data-testid="lesson-title">{lesson.title}</h1>
                    {lesson.content?.length ? (
                        lesson.content.map((block) => {
                            switch (block.type) {
                                case "heading":
                                    return <h2 key={block.id} data-testid="heading2">{block.text}</h2>;
                                case "paragraph":
                                    return <p key={block.id}>{block.text}</p>;
                                case "code":
                                    return (
                                        <pre key={block.id}>
                                            <code>{block.text}</code>
                                        </pre>
                                    );
                                case "image":
                                    return (
                                        <img
                                            key={block.id}
                                            src={block.src}
                                            alt={block.alt || "Image"}
                                        />
                                    );
                                case "video":
                                    return (
                                        <iframe
                                            key={block.id}
                                            width="560"
                                            height="315"
                                            data-testid="video"
                                            src={block.src}
                                            title={block.searchTerm || "Video"}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    );
                                case "divider":
                                    return <hr key={block.id} data-testid="divider" />;
                                case "orderedlist":
                                    return (
                                        <ol key={block.id}>
                                            {block.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ol>
                                    );
                                case "unorderedlist":
                                    return (
                                        <ul key={block.id}>
                                            {block.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                default:
                                    return (
                                        <p>
                                            Unsupported content type: {(block as any).type}
                                        </p>
                                    );
                            }
                        })
                    ) : (
                        <p>No content available.</p>
                    )}
                </div>
            ) : (
                <div>Empty Lesson</div>
            )}

            <div>
                <Button>Back</Button>
                <Button className="blue-button">
                    {lesson?.completed ? "Lesson Completed" : "Mark Complete"}
                </Button>
                <Button>
                    Next
                </Button>
            </div>
        </div>
    );
}
