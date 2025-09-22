'use client'

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/app/components/Button/Button";
import BookBlueCircle from '@/app/icons/BookBlueCircle.svg'
import { CodeBlock } from "@/app/components/CodeBlock/CodeBlock";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { redirect } from 'next/navigation';
import styles from './page.module.css'

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

export default function Page() {
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
        <div className="px-4 md:px-8 py-6">
            {loading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="xl:ml-72 flex flex-col gap-6 items-center justify-center max-w-[360px] bg-white p-4 rounded-3xl border border-zinc-300">
                        <svg
                            fill="#2B7FFFFF"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10"
                        >
                            <circle cx="12" cy="12" r="3" />
                            <g>
                                <circle cx="4" cy="12" r="3" />
                                <circle cx="20" cy="12" r="3" />
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    calcMode="spline"
                                    dur="1s"
                                    keySplines=".36,.6,.31,1;.36,.6,.31,1"
                                    values="0 12 12;180 12 12;360 12 12"
                                    repeatCount="indefinite"
                                />
                            </g>
                        </svg>

                        <p className="font-medium text-sm">Loading Lesson...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="xl:ml-72 min-w-72 flex flex-col gap-8 items-center bg-white p-8 rounded-3xl border border-zinc-300">
                        <ExclamationTriangleIcon className="size-20 w-20 h-20 text-zinc-500" strokeWidth={1.2} ></ExclamationTriangleIcon>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <h1 className="text-xl font-bold text-center">Fetching Lesson Error</h1>
                            <p className="text-center">Something went wrong while loading the lesson. Please try again.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Button className="default-button flex flex-row gap-3" type="button" onClick={fetchData}>
                                <ArrowPathIcon className="size-6 w-6 h-6"></ArrowPathIcon>
                                <span className="text-center">Retry</span>
                            </Button>
                        </div>
                    </div>
                </div>

            ) : lesson ? (
                <div className="max-w-7xl m-auto">
                    <div className="flex flex-row gap-4 items-center">
                        <Image className="size-9" src={BookBlueCircle} alt="" width={36} height={36}></Image>
                        <h1 data-testid="lesson-title" className="font-bold text-2xl">{lesson.title}</h1>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        {lesson.content?.length ? (
                            lesson.content.map((block) => {
                                switch (block.type) {
                                    case "heading":
                                        return <h2 className="font-bold text-lg" key={block.id} data-testid="heading2">{block.text}</h2>;
                                    case "paragraph":
                                        return <p key={block.id} dangerouslySetInnerHTML={{ __html: block.text }} className={styles.apply_inline_styles} data-testid="paragraph">
                                            
                                        </p>
                                    case "code":
                                        return (
                                            <CodeBlock id={block.id} text={block.text} lang={block.lang} />
                                        );
                                    case "image":
                                        return (
                                            <Image
                                                key={block.id}
                                                src={block.src}
                                                alt={block.alt || "Image"}
                                                width={600}
                                                height={400}
                                                className="m-auto w-full max-w-3xl h-auto p-4 bg-white rounded-3xl border border-zinc-300"
                                                unoptimized
                                            />
                                        );
                                    case "video":
                                        return (
                                            <iframe
                                                key={block.id}
                                                data-testid="video"
                                                src={block.src}
                                                title={block.searchTerm || "Video"}
                                                frameBorder="0"
                                                className="aspect-video m-auto max-w-3xl p-4 bg-white rounded-3xl border border-zinc-300"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        );
                                    case "divider":
                                        return <hr key={block.id} className="h-0.5 w-full bg-zinc-300 rounded-full" data-testid="divider" />;
                                    case "orderedlist":
                                        return (
                                            <ol key={block.id} className="list-decimal ml-4">
                                                {block.items.map((item, i) => (
                                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} className={styles.apply_inline_styles}></li>
                                                ))}
                                            </ol>
                                        );
                                    case "unorderedlist":
                                        return (
                                            <ul key={block.id} className="list-disc ml-4">
                                                {block.items.map((item, i) => (
                                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} className={styles.apply_inline_styles}></li>
                                                ))}
                                            </ul>
                                        );
                                    default:
                                        return (
                                            <p className="text-red-500 bg-red-200 border border-red-500 rounded-3xl p-4">
                                                Unsupported content type: {(block as any).type}
                                            </p>
                                        );
                                }
                            })
                        ) : (
                            <p className="text-zinc-500 bg-zinc-200 border border-zinc-500 rounded-3xl p-4">No content available.</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 w-full m-auto max-w-3xl">
                        <Button className="default-button flex flex-row gap-2 items-center" type="button" onClick={() => redirect(`/dashboard/courses/${lesson.id}/${lesson.nextLessonID}`)} disabled={!lesson.previousLessonID}>
                            <ChevronLeftIcon className="h-auto w-6"></ChevronLeftIcon>
                            <span>Back</span>
                        </Button>
                        <Button className="blue-button w-max">
                            {/*write a function that updates the lesson to completed and refresh the page*/}
                            {lesson?.completed ? "Lesson Completed" : "Mark Complete"}
                        </Button>
                        <Button className="default-button flex flex-row gap-2 items-center" type="button" onClick={() => redirect(`/dashboard/courses/${lesson.id}/${lesson.nextLessonID}`)} disabled={!lesson.nextLessonID}>
                            <span>Next</span>
                            <ChevronRightIcon className="h-auto w-6"></ChevronRightIcon>
                        </Button>
                    </div>

                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="xl:ml-72 min-w-72 flex flex-col gap-8 items-center bg-white p-8 rounded-3xl border border-zinc-300">
                        <BookOpenIcon className="size-20 w-20 h-20 text-zinc-500" strokeWidth={1.1} />
                        <div className="flex flex-col items-center justify-center gap-2">
                            <h1 className="text-xl font-bold text-center">Lesson Empty</h1>
                            <p className="text-center">No info about the lesson.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Button className="default-button flex flex-row gap-3" type="button" onClick={fetchData}>
                                <ArrowPathIcon className="size-6 w-6 h-6"></ArrowPathIcon>
                                <span className="text-center">Retry</span>
                            </Button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
