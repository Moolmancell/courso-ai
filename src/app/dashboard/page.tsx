import { FinishedCourseCard } from "../components/FinishedCourseCard/FinishedCourseCard"
import { ActiveCourseCard } from "../components/ActiveCourseCard/ActiveCourseCard"
import Link from "next/link"
import { RecentCoursesv2 } from "../components/RecentCoursesv2/RecentCoursesv2"
import { RecentHistory } from "../components/RecentHistory/RecentHistory"

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
                    <RecentCoursesv2 userID="1234" />                       
                </div>
            </section>

            <section className="px-4 mb-12">
                <div className="flex flex-row justify-between items-center my-4">
                    <h1 className="font-medium text-2xl">History</h1>
                    <Link href={"/dashboard/history"} className="text-sm font-semibold underline">See all courses</Link>
                </div>

                <div>
                    <RecentHistory userID="1234" />                     
                </div>
            </section>
        </div>
    )
}