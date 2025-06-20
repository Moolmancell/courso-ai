import { Button } from "../Button/Button"

export function CourseCardv2({id,lessons, title, progress, courseLink}: 
    {id: number,lessons: number, title: string, progress: number, courseLink: string}) {
    return (
        <div key={id} data-testid="course-card">
            <p>{lessons} Lessons</p>
            <h2>{title}</h2>
            <div data-testid="progress-bar" style={{width: `${progress}%`}}></div>
            <p>{progress}% Completed</p>
            <Button type="link" href={courseLink}>
                {progress > 0 ? "Continue" : "Start"}
            </Button>
        </div>
    )
}