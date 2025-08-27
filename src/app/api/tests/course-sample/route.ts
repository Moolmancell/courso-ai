// src/app/api/courses/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const course = {
    id: "course-1",
    title: "React for Beginners",
    progress: 45,
    lessonCount: 8,
    modules: [
      {
        id: "modules-1",
        title: "Getting Started",
        lessons: [
          { id: "lesson-1", title: "Introduction to React", completed: true },
          {
            id: "lesson-2",
            title: "Setting Up the Development Environment",
            completed: true,
          },
        ],
      },
      {
        id: "modules-2",
        title: "Core Concepts",
        lessons: [
          { id: "lesson-3", title: "JSX and Rendering Elements", completed: true },
          { id: "lesson-4", title: "Components and Props", completed: false },
          { id: "lesson-5", title: "State and Lifecycle", completed: false },
        ],
      },
      {
        id: "modules-3",
        title: "Building the App",
        lessons: [
          { id: "lesson-6", title: "Handling Events", completed: false },
          { id: "lesson-7", title: "Lists and Keys", completed: false },
          { id: "lesson-8", title: "Forms in React", completed: false },
        ],
      },
    ],
  };

  return NextResponse.json(course);
}
