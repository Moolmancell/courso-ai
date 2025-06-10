import { CourseTag } from "../CourseTag/CourseTag"
import { TagVariant } from "../CourseTag/CourseTag.types"

export function CourseCard({ title, progress, source } : { title: string, progress: number, source: TagVariant }) {
    return <div className="p-4 border border-zinc-300 rounded-3xl">
        <div>
            <CourseTag variant={source}/>
            <h1>{title}</h1>
            <span>{progress}</span>
        </div>
    </div>
}