'use client';
import { Accordion } from '@/components/ui/Accordion/Accordion'
import { Button } from '@/components/ui/Button/Button'
import { usePathname } from "next/navigation";
import Image from "next/image"
import BookBlueCircle from '@/assets/icons/BookBlueCircle.svg'
import { PlayIcon } from "@heroicons/react/24/outline";
import { LessonTab } from "@/components/ui/LessonTab/LessonTab";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useCourseDetails } from "@/features/Course/hooks/useCourseDetails/useCourseDetails";
import { CenteredCard } from "@/components/ui/CenteredCard/CenteredCard";
import { Loading } from "@/components/ui/Loading/Loading";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar';

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

export default function Page() {

  const pathname = usePathname();
  const pathArray = pathname.split('/').filter(segment => segment !== '');

  const courseID = pathArray[pathArray.length - 1]

  const {loading, courseDetails, error, fetchFunc} = useCourseDetails(courseID)

  if (loading) {
    return <Loading />
  }

  if (error !== "") {
    return <CenteredCard  
      Icon={ExclamationTriangleIcon} 
      title="Fetching Course Error" 
      message="Something went wrong while loading the course. Please try again."
    >
      <Button Icon={ArrowPathIcon} className="default-button flex flex-row gap-3" type="button" onClick={fetchFunc}>
        Retry
      </Button>
      <Button Icon={ChevronLeftIcon} className="blue-button flex flex-row gap-3" type="link" href="/dashboard/courses">
        Go to Courses
      </Button>
    </CenteredCard>
  }

  if (!courseDetails) {
    return <CenteredCard 
      Icon={BookOpenIcon} 
      title="Course Empty" 
      message="No Info about the course."
    >
      <Button Icon={ArrowPathIcon} className="default-button flex flex-row gap-3" type="button" onClick={fetchFunc}>
        Retry
      </Button>
      <Button Icon={ChevronLeftIcon} className="blue-button flex flex-row gap-3" type="link" href="/dashboard/courses">
        Go to Courses
      </Button>
    </CenteredCard>
  }

  return (
    <div className="flex flex-col gap-12 items-center m-auto px-4 md:px-8 max-w-7xl">
      <div className="flex flex-col gap-4 items-center w-full max-w-[480px]">
        <h1 className="font-bold text-2xl">{courseDetails.title}</h1>

        {/* Progress bar */}
        <div className="w-full flex flex-col items-center gap-2">
          <ProgressBar progress={courseDetails.progress} />

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

      <Button Icon={PlayIcon} type="link" href="/dashboard/courses/testlesson" className={courseDetails.progress === 0 ? "default-button" : "blue-button flex flex-row gap-2"}>
        {courseDetails.progress === 0 ? "Start Course" : "Continue"}
      </Button>
      //make this button link to the next incomplete lesson in the course

    </div>
  );
}
