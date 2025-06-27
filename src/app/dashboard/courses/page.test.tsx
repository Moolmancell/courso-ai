import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import CoursesPage from "./page"; // Assuming the component is the default export

describe('Course Page', () => {
  it("renders the Course Title", () => {
    render(<CoursesPage />);
    expect(screen.getByRole('heading', { name: /Courses/i })).toBeInTheDocument();
  });

  it("renders the Add Course Button", () => {
    render(<CoursesPage />);
    expect(screen.getByRole('button', { name: /Add Course/i })).toBeInTheDocument();
  });

  it("renders the CourseList", () => {
    render(<CoursesPage />);
    // This test assumes that the Courses component renders a list or container
    // You might need a more specific selector depending on your implementation
    expect(screen.getByTestId('courses-list')).toBeInTheDocument(); // Assuming a data-testid="courses-list" on the container
  });
});