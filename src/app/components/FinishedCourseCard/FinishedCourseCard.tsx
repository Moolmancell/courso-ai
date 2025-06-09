import GreenFolder from "@/app/icons/GreenFolder.svg"
import Image from "next/image" 

export function FinishedCourseCard({ numberOfFinished = 0 }) {
    return <div className="bg-green-200 p-4 flex flex-row items-center gap-4 rounded-3xl">
        <Image src={GreenFolder} alt="Green Folder Icon"/>
        <div className="flex flex-col gap-2">
            <h1 className="text-xl text-green-950 font-bold">{ numberOfFinished }</h1>
            <p className="text-base text-green-900 font-medium">Finished Courses</p>
        </div>
    </div>
}