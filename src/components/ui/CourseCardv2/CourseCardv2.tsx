import { Button } from "../Button/Button"
import Image from "next/image"
import BookBlueCircle from '@/assets/icons/BookBlueCircle.svg'

export function CourseCardv2({id,lessons, title, progress, courseLink}: 
    {id: number,lessons: number, title: string, progress: number, courseLink: string}) {
    return (
        <div key={id} data-testid="course-card" 
            className="flex flex-col justify-between 
                    min-h-64 box-border p-4 border 
                    border-zinc-300 rounded-3xl bg-white"
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-3 items-center">
                    <Image className="size-9" src={BookBlueCircle} alt="" width={36} height={36}></Image>
                    <p className="text-sm font-semibold">{lessons} Lessons</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-xl/snug line-clamp-2 w-full max-h-[52px]">{title}</h2>
                        <div className="h-0.5 w-full bg-zinc-300 rounded-full"></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="w-full h-2 bg-zinc-200 rounded-3xl">
                            <div data-testid="progress-bar" className="h-full bg-blue-500 rounded-3xl" style={{width: `${progress}%`}}></div>
                        </div>
                        <p className="text-sm font-medium h-[18px]">{progress}% Completed</p>
                    </div>
                </div>
            </div>

            <Button type="link" href={courseLink} className="default-button self-start">
                {progress > 0 ? "Continue" : "Start"}
            </Button>
        </div>
    )
}