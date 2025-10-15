import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { Courses } from "./Courses";
import "@testing-library/jest-dom"

//unit tests
describe("Courses", () => {
    beforeEach(() => {
        const mockCourses = Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            lessons: Math.floor(Math.random() * 20) + 1,
            title: `Course Title ${i + 1}`,
            progress: Math.floor(Math.random() * 100),
            courseLink: `/courses/${i + 1}`
        }));

        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return {
                    "courses": mockCourses,
                    "total": 100,
                    "page": 1,
                }
            },
        } as Response);
    });

    it('it exists', () => {
        render(<Courses userID="1234"/>)
        expect(screen.getByTestId("courses")).toBeInTheDocument();
    })
    it("search bar is rendered", () => {
        render(<Courses userID="1234"/>)
        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    })
    it('search bar is working', async () => {
        render(<Courses userID="1234"/>)
        const searchInput = screen.getByTestId("search-bar");
        fireEvent.change(searchInput, { target: { value: "React" } });
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("/api/tests/courses?page=1&q=React");
        });
    })
    it("render 12 course cards", async () => {
        render(<Courses userID="1234"/>)
        await waitFor(() => {
            expect(screen.getAllByTestId("course-card")).toHaveLength(12);
        }, { timeout: 3000 });
    });
    it("loading is being rendered", async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => new Promise(() => {}), // Mock a pending promise to simulate loading
        } as Response);
        render(<Courses userID="1234"/>)
        expect(screen.getByTestId("loading")).toBeInTheDocument(); // Assuming you render "Loading..."
    });

    it("error is being rendered", async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: () => Promise.resolve({ message: "Failed to fetch data" }),
        } as Response);
        render(<Courses userID="1234"/>)
        await waitFor(() => {
            expect(screen.getByText("Error:")).toBeInTheDocument(); // Assuming you render "Error: " + message
        });
    });

    it("no courses yet", async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(
            {courses: [],total: 0,page: 1}
        ) } as Response);
        render(<Courses userID="1234"/>)
        await waitFor(() => {
            expect(screen.getByText("No courses available.")).toBeInTheDocument(); // Assuming you render "No courses available."
        });
    })

    it("pagination renders", async () => {
        render(<Courses userID="1234"/>)
        await waitFor(() => {
            expect(screen.getByTestId("pagination")).toBeInTheDocument()
        }, {timeout: 3000})
    })
})