import { describe, it, expect, vi, beforeEach } from 'vitest';
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { RecentCourses } from "./RecentCourses";

// Optional: Mock CourseCard to isolate this component test
vi.mock("../CourseCard/CourseCard", () => ({
  CourseCard: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe("RecentCourses", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it("renders 6 recent courses", async () => {
        const mockData = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        title: `Course ${i}`,
        progress: 50,
        source: "web",
        courseLink: `/courses/${i}`
        }
    ));

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<RecentCourses userID="123456" />);

    await waitFor(() => {
      mockData.forEach(course => {
        expect(screen.getByText(course.title)).toBeInTheDocument();
      });
    });
  });

  it("shows notice when no courses", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<RecentCourses userID="123456" />);

    await waitFor(() => {
      expect(screen.getByText("No courses found")).toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    (fetch as any).mockRejectedValueOnce(new Error("Server error"));

    render(<RecentCourses userID="123456" />);

    await waitFor(() => {
      expect(screen.getByText("Error: Server error")).toBeInTheDocument();
    });
  });
});
