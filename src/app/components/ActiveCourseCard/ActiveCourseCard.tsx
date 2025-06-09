import BlueFolder from "@/app/icons/BlueFolder.svg"
import Image from "next/image" 

export function ActiveCourseCard({ numberOfFinished = 0 }) {
    return <div className="bg-blue-200 p-4 flex flex-row items-center gap-4 rounded-3xl">
        <Image src={BlueFolder} alt="Green Folder Icon"/>
        <div className="flex flex-col gap-2">
            <h1 className="text-xl text-blue-950 font-bold">{ numberOfFinished }</h1>
            <p className="text-base text-blue-900 font-medium">Finished Courses</p>
        </div>
    </div>
}