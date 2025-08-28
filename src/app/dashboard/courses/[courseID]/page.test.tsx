import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom"
import Page from '@/app/dashboard/courses/[courseID]/page'

const mockCourse = {
    "id": "course-1",
    "title": "React for Beginners",
    "progress": 45,
    "lessonCount": 8,
    "modules": [
        {
            "id": "modules-1",
            "title": "Getting Started",
            "lessons": [
                { "id": "lesson-1", "title": "Introduction to React", "completed": true },
                { "id": "lesson-2", "title": "Setting Up the Development Environment", "completed": true }
            ]
        },
        {
            "id": "modules-2",
            "title": "Core Concepts",
            "lessons": [
                { "id": "lesson-3", "title": "JSX and Rendering Elements", "completed": true },
                { "id": "lesson-4", "title": "Components and Props", "completed": false },
                { "id": "lesson-5", "title": "State and Lifecycle", "completed": false }
            ]
        },
        {
            "id": "modules-3",
            "title": "Building the App",
            "lessons": [
                { "id": "lesson-6", "title": "Handling Events", "completed": false },
                { "id": "lesson-7", "title": "Lists and Keys", "completed": false },
                { "id": "lesson-8", "title": "Forms in React", "completed": false }
            ]
        }
    ]
}

global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockCourse),
    } as Response)
);

vi.mock("next/navigation", () => ({
    usePathname: () => "/dashboard/courses/course-1",
}));

describe('[courseID]', () => {

    it('renders the title', async () => {
        render(<Page />)
        expect(await screen.findByText('React for Beginners')).toBeInTheDocument();
    });
    it('renders the progressbar with the right percentage', async () => {
        render(<Page />)
        expect(await screen.findByText('45% Completed')).toBeInTheDocument();
        expect(await screen.findByTestId('progress-bar')).toBeInTheDocument();
        expect(await screen.findByTestId('progress-bar')).toHaveStyle(`width: 45%;`);
    });
    it('renders the lesson count', async () => {
        render(<Page />)
        expect(await screen.findByText('8 Lessons')).toBeInTheDocument();
    });
    it('renders the accordion with the right amount', async () => {
        render(<Page />)
        expect(await screen.findAllByTestId('accordion')).toHaveLength(3);
    });
    it('renders the accordion with the right module title and lessons', async () => {
        render(<Page />)
        expect(await screen.findByText('Getting Started')).toBeInTheDocument();
        expect(await screen.findByText('Core Concepts')).toBeInTheDocument();
    })
    it('render button with Text as continue', async () => {
        render(<Page />)
        expect(await screen.findByRole('link', {name: 'Continue'})).toBeInTheDocument();
    })
    it('renders "Start Course" when progress is 0', async () => {
        // override fetch for this test only
        (global.fetch as any) = vi.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              ...mockCourse,
              progress: 0, // force progress to 0
            }),
          } as Response)
        );
      
        render(<Page />);
      
        expect(await screen.findByRole('link', { name: 'Start Course' })).toBeInTheDocument();
    });
    it.todo('loading works', () => {
        render(<Page />);
    })
    it.todo('show error if something goes wrong or course doesnt exists', () => {

    })
})