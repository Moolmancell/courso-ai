import { FinishedCourseCard } from "../../features/Finished Course Card/components/FinishedCourseCard/FinishedCourseCard"
import { ActiveCourseCard } from "../../features/Active Course Card/components/ActiveCourseCard/ActiveCourseCard"
import Link from "next/link"
import { RecentCoursesv2 } from "../../features/Recent Courses/components/RecentCoursesv2/RecentCoursesv2"
import { RecentHistory } from "../../components/ui/RecentHistory/RecentHistory"

export default function Dashboard({nameofUser = "User"} : {nameofUser: string}) {
    return (
        <div className="max-w-7xl m-auto">
            <section className="px-4 mb-12 md:px-8">
                <h1 className="font-bold text-2xl my-4">Hello, {nameofUser}</h1>
                <div className="flex flex-col gap-2 sm:flex-row sm:w-full">
                    <div className="sm:max-w-80 sm:w-full"><FinishedCourseCard/></div>
                    <div className="sm:max-w-80 sm:w-full"><ActiveCourseCard/></div>
                </div>
            </section>
            <div className="lg:grid lg:grid-cols-3 lg:px-8 lg:gap-12">
                <section className="px-4 mb-12 md:px-8 lg:col-span-2 lg:px-0">
                    <div className="flex flex-row justify-between items-center my-4">
                        <h1 className="font-medium text-2xl">Recents</h1>
                        <Link href={"/dashboard/courses"} className="text-sm font-semibold underline">See all courses</Link>
                    </div>

                    <div>
                        <RecentCoursesv2 userID="1234" />                       
                    </div>
                </section>

                <section className="px-4 mb-12 md:px-8 lg:px-0">
                    <div className="flex flex-row justify-between items-center my-4">
                        <h1 className="font-medium text-2xl">History</h1>
                        <Link href={"/dashboard/history"} className="text-sm font-semibold underline">See all history</Link>
                    </div>

                    <div>
                        <RecentHistory userID="1234" />                     
                    </div>
                </section>
            </div>
        </div>
    )
}