// src/components/CourseSearchBar/CourseSearchBar.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React from 'react';

interface CourseSearchBarProps {
    searchTerm: string;
    onSearchChange: (searchTerm: string) => void;
}

export function CourseSearchBar({ searchTerm, onSearchChange }: CourseSearchBarProps) {
    return (
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
            <div className="relative flex items-center">
                <MagnifyingGlassIcon className="size-6 absolute left-4 text-zinc-500" />
                <input
                    type="search"
                    data-testid="search-bar"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search For Course"
                    className="
                        bg-white py-3 px-4 rounded-3xl border border-zinc-300
                        placeholder-zinc-700 text-sm pl-12 font-normal w-full
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                />
            </div>
        </form>
    )
}