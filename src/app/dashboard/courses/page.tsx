// src/components/Courses/Courses.tsx
"use client"

import { useState } from "react"
import { Pagination } from "@/components/ui/Pagination/Pagination"
import { useCoursesData } from "@/features/Courses/hooks/useCoursesData"; // Assuming path to your new hook
import { CourseList } from "@/features/Courses/components/CourseList/CourseList"; // New component
import { CourseSearchBar } from "@/features/Courses/components/CourseSearchBar/CourseSearchBar"; // New component
import { Button } from "@/components/ui/Button/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CreateCourseForm } from "@/components/ui/CreateCourseForm/CreateCourseForm";
// The course interface is now defined/imported in useCoursesData.ts
// interface course { ... }

export default function Courses({ userID }: { userID: string }) {
    // 1. Local State for Control (Pagination and Search)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    // 2. Custom Hook for Data and Logic
    const {
        courses,
        loading,
        error,
        totalPages,
        fetchData // Exposed for the refresh button
    } = useCoursesData(userID, currentPage, searchTerm);

    // 3. Handlers
    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
        setCurrentPage(1); // Crucial: Reset page when search term changes
    };

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
                <div data-testid="courses" className="flex flex-col gap-4 relative min-h-96">
                    {/* Search Bar */}
                    <CourseSearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                    />

                    {/* Course List & State Display (Loading, Error, Empty) */}
                    <CourseList
                        courses={courses}
                        loading={loading}
                        error={error}
                        onRefresh={fetchData} // Pass the refresh function to the list
                    />

                    {/* Pagination is only shown if not loading, no error, and there are courses */}
                    {!loading && !error && courses.length > 0 && (
                        <div className="flex flex-col gap-8">
                            {/* The CourseList is already rendered above, but if you want to group them */}
                            {/* ... (CourseList content is inside CourseList) */}

                            {/* Pagination */}
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    )}
                </div>

            </section>
            {isModalOpen && <CreateCourseForm onCancel={handleCloseModal} />}
        </div>
    )
}