import { Button } from "@/app/components/Button/Button"
import { PlusIcon } from "@heroicons/react/24/outline"

export default function Courses() {
    return (
        <div>
            <section className="px-4 mb-12 md:px-8">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-2xl my-4">Courses</h1>
                    <Button className="blue-button">
                        <PlusIcon className="size-6"></PlusIcon>
                        <span>Add Course</span>
                    </Button>
                </div>
            </section>
        </div>
    )
}