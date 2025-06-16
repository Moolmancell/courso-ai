import { FinishedCourseCard } from "../components/FinishedCourseCard/FinishedCourseCard"
import { ActiveCourseCard } from "../components/ActiveCourseCard/ActiveCourseCard"
import Link from "next/link"
import { CourseCard } from "../components/CourseCard/CourseCard"
import { RecentCourses } from "../components/RecentCourses/RecentCourses"

export default function Dashboard({nameofUser = "User"} : {nameofUser: string}) {
    return (
        <div>
            <section className="px-4 mb-12">
                <h1 className="font-bold text-2xl my-4">Hello, {nameofUser}</h1>
                <div className="flex flex-col gap-2">
                    <FinishedCourseCard/>
                    <ActiveCourseCard/>    
                </div>
            </section>

            <section className="px-4 mb-12">
                <div className="flex flex-row justify-between items-center my-4">
                    <h1 className="font-medium text-2xl">Recents</h1>
                    <Link href={"/dashboard/courses"} className="text-sm font-semibold underline">See all courses</Link>
                </div>

                <div>
                    <RecentCourses userID="1234" />                       
                </div>
            </section>
        </div>
    )
}