//this is a mock API response for courses
// change soon

import { NextRequest, NextResponse } from 'next/server'

const mockCourses = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  lessons: Math.floor(Math.random() * 20) + 1,
  title: `Course Title ${i + 1}`,
  progress: Math.floor(Math.random() * 100),
  courseLink: `/dashboard/courses/course-${i + 1}`
}));

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const pageSize = 12; // 6 courses per page
  const filteredCourses = q
    ? mockCourses.filter((course) => course.title.toLowerCase().includes(q))
    : mockCourses;

  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return NextResponse.json({
    courses: paginatedCourses,
    total: totalPages,
    currentPage: page,
  });
}
