import { beforeEach, describe, expect, it, vi } from "vitest";
import { RecentCoursesv2 } from "./RecentCoursesv2"
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("RecentCoursesv2", () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Add 500ms delay
        return Promise.resolve([
          { id: 1, lessons: 10, title: "Course 1", progress: 20 },
          { id: 2, lessons: 5, title: "Course 2", progress: 50 },
          { id: 3, lessons: 12, title: "Course 3", progress: 75 },
          { id: 4, lessons: 8, title: "Course 4", progress: 10 },
          { id: 5, lessons: 15, title: "Course 5", progress: 90 },
          { id: 6, lessons: 7, title: "Course 6", progress: 30 },
        ]);
      },
    } as Response);
  });

  it("renders RecentCoursesv2", async () => {
    render(<RecentCoursesv2 userID="123456"/>);
    expect(await screen.getByTestId("recent-courses")).toBeInTheDocument();
  });

  it("renders 6 recent CourseCards", async () => {
    render(<RecentCoursesv2 userID="123456"/>);
    expect(await screen.findAllByTestId("course-card")).toHaveLength(6);
    
  });
  it("shows loading screen", async () => {
    render(<RecentCoursesv2 userID="123456"/>);
    expect(await screen.getByTestId("loading")).toBeInTheDocument();
  });
  it("shows error when something is wrong and refresh button", async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error("Failed to fetch"));
    render(<RecentCoursesv2 userID="123456"/>);
    expect(await screen.findByTestId("error-message")).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: 'Refresh'})).toBeInTheDocument()
  });
  it("refresh button when clicked fetches the data again", async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error("Failed to fetch"));
    render(<RecentCoursesv2 userID="123456"/>);
    
    const refreshButton = await screen.findByRole('button', {name: 'Refresh'})

    await fireEvent.click(refreshButton)

    expect(await screen.getByTestId('loading')).toBeInTheDocument()
  })
  it("if there are no courses yet", async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Add 500ms delay
        return Promise.resolve([]);
      },
    } as Response);
    render(<RecentCoursesv2 userID="123456"/>);

    expect(await screen.findByTestId("no-courses")).toBeInTheDocument();
    expect(await screen.findByRole("link", {name: 'Start a Course'})).toBeInTheDocument();
  })
});