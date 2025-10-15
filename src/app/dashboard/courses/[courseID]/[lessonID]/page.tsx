'use client'

import { Button } from "@/components/ui/Button/Button";
import BookBlueCircle from '@/assets/icons/BookBlueCircle.svg'
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { redirect } from 'next/navigation';
import { CheckCircleIcon } from "@heroicons/react/24/outline"; 
import { useLessonContent } from "@/features/Lesson/hooks/useLessonContent"; 
import { Loading } from "@/components/ui/Loading/Loading";
import { CenteredCard } from "@/components/ui/CenteredCard/CenteredCard";
import { LessonContent } from "@/features/Lesson/types/LessonContent";
import { LessonContentRenderer } from "@/features/Lesson/components/LessonContentRenderer/LessonContentRenderer";

export default function Page() {

    const {lesson, loading, error, fetchData} = useLessonContent();
    
    return (
        <div className="px-4 md:px-8 py-6">
            {loading ? (
                <Loading data-testid="loading"/>
            ) : error ? (
                <CenteredCard Icon={ExclamationTriangleIcon} title="Fetching Lesson Error" message="There was an error fetching the lesson. Please try again.">
                    <Button className="default-button flex flex-row gap-3" type="button" onClick={fetchData}>
                        <ArrowPathIcon className="size-6 w-6 h-6"></ArrowPathIcon>
                        <span className="text-center">Retry</span>
                    </Button>
                </CenteredCard>

            ) : lesson ? (
                <div className="max-w-7xl m-auto">
                    <div className="flex flex-row gap-4 items-center">
                        <Image className="size-9" src={BookBlueCircle} alt="" width={36} height={36}></Image>
                        <h1 data-testid="lesson-title" className="font-bold text-2xl">{lesson.title}</h1>
                    </div>

                    <LessonContentRenderer content={lesson.content} />

                    {/* Navigation */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 w-full m-auto max-w-3xl">
                        <Button className="default-button flex flex-row gap-2 items-center" type="button" onClick={() => redirect(`/dashboard/courses/${lesson.id}/${lesson.nextLessonID}`)} disabled={!lesson.previousLessonID}>
                            <ChevronLeftIcon className="h-auto w-6"></ChevronLeftIcon>
                            <span>Back</span>
                        </Button>
                        <Button className="blue-button flex flex-row gap-2 items-center">
                            {/*write a function that updates the lesson to completed and refresh the page*/}
                            {lesson?.completed && <CheckCircleIcon className="h-auto w-6"></CheckCircleIcon>}
                            {lesson?.completed ? "Lesson Completed" : "Mark Complete"}
                        </Button>
                        <Button className="default-button flex flex-row gap-2 items-center" type="button" onClick={() => redirect(`/dashboard/courses/${lesson.id}/${lesson.nextLessonID}`)} disabled={!lesson.nextLessonID}>
                            <span>Next</span>
                            <ChevronRightIcon className="h-auto w-6"></ChevronRightIcon>
                        </Button>
                    </div>

                </div>
            ) : (
                <CenteredCard Icon={BookOpenIcon} title="No Content Available" message="">
                    <Button className="default-button flex flex-row gap-3" type="button" onClick={fetchData}>
                        <ArrowPathIcon className="size-6 w-6 h-6"></ArrowPathIcon>
                        <span className="text-center">Retry</span>
                    </Button>
                </CenteredCard>
            )}

        </div>
    );
}
