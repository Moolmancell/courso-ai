import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom"; // Not needed with Vitest
import CoursesPage from "./page"; // Assuming the component is the default export

describe('Course Page', () => {
  beforeEach(async () => {
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        prefetch: vi.fn(),
      }),
    }));
  })

  it("renders the Course Title", () => {
    render(<CoursesPage />);
    expect(screen.getByRole('heading', { name: /Courses/i })).toBeInTheDocument();
  });

  it("renders the Add Course Button", () => {
    render(<CoursesPage />);
    expect(screen.getByRole('button', { name: /Add Course/i })).toBeInTheDocument();
  });

  it("renders the Courses", () => {
    render(<CoursesPage />);
    // This test assumes that the Courses component renders a list or container
    // You might need a more specific selector depending on your implementation
    expect(screen.getByTestId('courses')).toBeInTheDocument(); // Assuming a data-testid="courses-list" on the container
  });

  it("modal is not visible initially", () => {
    render(<CoursesPage />);
    expect(screen.queryByRole('heading', { name: /Create Course/i })).not.toBeInTheDocument();
  });

  it("modal becomes visible when Add Course button is clicked", () => {
    render(<CoursesPage />);
    fireEvent.click(screen.getByRole('button', { name: /Add Course/i }));
    expect(screen.getByRole('heading', { name: /Create Course/i })).toBeInTheDocument();
  });

  it("modal becomes hidden when onCancel is called in the form", () => {
    render(<CoursesPage />);
    fireEvent.click(screen.getByRole('button', { name: /Add Course/i }));
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i })); // Assuming your form has a Cancel button
    expect(screen.queryByRole('heading', { name: /Create Course/i })).not.toBeInTheDocument();
  });
});