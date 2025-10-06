"use client"

import { Button } from "@/components/ui/Button/Button"
import { PlusIcon } from "@heroicons/react/24/outline"
import { Courses } from "@/components/ui/Courses/Courses"
import { useState } from "react"
import { CreateCourseForm } from "@/components/ui/CreateCourseForm/CreateCourseForm"

export default function CoursesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    return (
        <div className="max-w-7xl m-auto">
            <section className="px-4 mb-12 md:px-8">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold text-2xl my-4">Courses</h1>
                    <Button className="blue-button" onClick={handleOpenModal}>
                        <PlusIcon className="size-6"></PlusIcon>
                        <span>Add Course</span>
                    </Button>
                </div>
                <Courses userID="1234" />
            </section>
            {isModalOpen && <CreateCourseForm onCancel={handleCloseModal} />}
        </div>
    )
}