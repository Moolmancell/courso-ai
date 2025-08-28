'use client';
import { useEffect, useState } from "react";
import { Accordion } from '@/app/components/Accordion/Accordion'
import { Button } from '@/app/components/Button/Button'
import { usePathname } from "next/navigation";
import Image from "next/image"
import BookBlueCircle from '@/app/icons/BookBlueCircle.svg'
import { PlayIcon } from "@heroicons/react/24/outline";

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
  console.log(pathArray)

  const courseID = pathArray[pathArray.length - 1]

  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/tests/course-sample`); //test route must change later for production
        const json = await res.json();
        setCourseDetails(json);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFunc();
  }, [courseID]);

  if (loading || !courseDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-12 items-center px-4 md:px-8">
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
              <p key={lesson.id}>{lesson.title}</p>
            ))}
          </Accordion>
        ))}
      </div>

      <Button type="link" href="/dashboard/courses/testlesson" className={courseDetails.progress === 0 ? "default-button" : "blue-button flex flex-row gap-2"}>
        <PlayIcon className="size-6 w-6 h-6"></PlayIcon>
        <span>{courseDetails.progress === 0 ? "Start Course" : "Continue"}</span>
      </Button>

    </div>
  );
}
