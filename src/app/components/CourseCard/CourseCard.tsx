import { CourseTag } from "../CourseTag/CourseTag"
import { TagVariant } from "@/app/types/TagVariant"

export function CourseCard({ title, progress, source } : { title: string, progress: number, source: TagVariant }) {
    return <div className="p-4 border border-zinc-300 rounded-3xl">
        <CourseTag variant={source}/>
        <h1>{title}</h1>
        <span>{progress}</span>
    </div>
}