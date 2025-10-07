import { CourseTag } from "../(deprecated) CourseTag/CourseTag"
import { TagVariant } from "../(deprecated) CourseTag/CourseTag.types"
import { Button } from "../Button/Button"  

export function CourseCard({ title, progress, source, courseLink } : 
    { title: string, progress: number, source: TagVariant, courseLink: string }) {

    return <div className="p-4 bg-white border border-zinc-300 rounded-3xl flex flex-col gap-8">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start">
                <CourseTag variant={source}/>
                <div className="flex flex-col h-16 w-full">
                    <h1 className="font-bold text-xl line-clamp-2 w-full mb-2">{title}</h1>
                    <div className="h-0.5 w-full bg-zinc-300"></div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="w-full h-2 bg-zinc-200 rounded-3xl" data-testid="progress-bar">
                    <div className="h-full bg-blue-500 rounded-3xl" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="font-medium text-sm">
                    {progress}% Completed
                </p>
            </div>
        </div>
        <Button type="link" href={courseLink} className="default-button self-start">
            {progress > 0 ? "Continue" : "Start"}
        </Button>
    </div>
}