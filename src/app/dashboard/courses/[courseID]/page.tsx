'use client';
import { useEffect, useState } from "react";
import { Accordion } from '@/components/ui/Accordion/Accordion'
import { Button } from '@/components/ui/Button/Button'
import { usePathname } from "next/navigation";
import Image from "next/image"
import BookBlueCircle from '@/app/icons/BookBlueCircle.svg'
import { PlayIcon } from "@heroicons/react/24/outline";
import { LessonTab } from "@/components/ui/LessonTab/LessonTab";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/outline";

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

export default function Page() {

  const pathname = usePathname();
  const pathArray = pathname.split('/').filter(segment => segment !== '');

  const courseID = pathArray[pathArray.length - 1]

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

  if (loading) {
    return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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

        <p className="font-medium text-sm">Loading Course...</p>
      </div>
    </div>
  }

  if (error !== "") {
    return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="xl:ml-72 min-w-72 flex flex-col gap-8 items-center bg-white p-8 rounded-3xl border border-zinc-300">
        <ExclamationTriangleIcon className="size-20 w-20 h-20 text-zinc-500" strokeWidth={1.2} ></ExclamationTriangleIcon>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold text-center">Fetching Course Error</h1>
          <p className="text-center">Something went wrong while loading the course. Please try again.</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Button className="blue-button flex flex-row gap-3" type="link" href="/dashboard/courses">
            <ChevronLeftIcon className="size-6 w-6 h-6"></ChevronLeftIcon>
            <span className="text-center">Go to Courses</span>
          </Button>
          <Button className="default-button flex flex-row gap-3" type="button" onClick={fetchFunc}>
            <ArrowPathIcon className="size-6 w-6 h-6"></ArrowPathIcon>
            <span className="text-center">Retry</span>
          </Button>
        </div>
      </div>
    </div>
  }

  if (!courseDetails) {
    return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="xl:ml-72 min-w-72 flex flex-col gap-8 items-center bg-white p-8 rounded-3xl border border-zinc-300">
        <BookOpenIcon className="size-20 w-20 h-20 text-zinc-500" strokeWidth={1.1} />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl font-bold text-center">Course Empty</h1>
          <p className="text-center">No info about the course.</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Button className="blue-button flex flex-row gap-3" type="link" href="/dashboard/courses">
            <ChevronLeftIcon className="size-6 w-6 h-6"></ChevronLeftIcon>
            <span className="text-center">Go to Courses</span>
          </Button>
          <Button className="default-button flex flex-row gap-3" type="button" onClick={fetchFunc}>
            <ArrowPathIcon className="size-6 w-6 h-6"></ArrowPathIcon>
            <span className="text-center">Retry</span>
          </Button>
        </div>

      </div>
    </div>
  }

  return (
    <div className="flex flex-col gap-12 items-center m-auto px-4 md:px-8 max-w-7xl">
      <div className="flex flex-col gap-4 items-center w-full max-w-[480px]">
        <h1 className="font-bold text-2xl">{courseDetails.title}</h1>

        {/* Progress bar */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-2 bg-zinc-200 rounded-3xl">
            <div
              className="h-full bg-blue-500 rounded-3xl"
              style={{ width: `${courseDetails.progress}%` }}
              data-testid="progress-bar"
            />
          </div>

          <p className="font-medium text-sm">{courseDetails.progress}% Completed</p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Image className="size-9" src={BookBlueCircle} alt="" width={36} height={36}></Image>
          <p className="font-semibold font-sm">{courseDetails.lessonCount} Lessons</p>
        </div>

      </div>

      <div className="bg-white rounded-3xl w-full p-2 border border-zinc-300 divide-y divide-zinc-300">
        {/* Accordion placeholder (to be implemented) */}
        {courseDetails.modules.map((module, index) => (
          <Accordion key={module.id} title={module.title} hasSubtitle={true} subtitle={`Module ${index + 1}`} data-testid="accordion">
            {module.lessons.map((lesson) => (
              <LessonTab key={lesson.id} lessonID={lesson.id} status={lesson.completed ? 'completed' : 'incomplete'}>{lesson.title}</LessonTab>
            ))}
          </Accordion>
        ))}
      </div>

      <Button type="link" href="/dashboard/courses/testlesson" className={courseDetails.progress === 0 ? "default-button" : "blue-button flex flex-row gap-2"}>
        <PlayIcon className="size-6 w-6 h-6"></PlayIcon>
        <span>{courseDetails.progress === 0 ? "Start Course" : "Continue"}</span>
      </Button>
      //make this button link to the next incomplete lesson in the course

    </div>
  );
}
