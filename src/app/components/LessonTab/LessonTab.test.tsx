import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { LessonTab } from "./LessonTab";

describe("LessonTab", () => {
    beforeEach(() => {
        // Reset any mocks or setup needed before each test
    });

    it("LessonTab exists", () => {
        render(<LessonTab status="incomplete"></LessonTab>);
        expect(screen.getByTestId("lessontab")).toBeInTheDocument();
    });

    it('renders the correct lesson title', () => {
        render(<LessonTab status="incomplete">Sample Lesson</LessonTab>);
        expect(screen.getByText("Sample Lesson")).toBeInTheDocument();
    });
    it('renders Completed LessonTab state', () => {
        render(<LessonTab status="completed">Completed Lesson</LessonTab>);
        expect(screen.getByTestId("Completed")).toBeInTheDocument();
    });
    it('renders Incomplete LessonTab state', () => {
        render(<LessonTab status="incomplete">Incomplete Lesson</LessonTab>);
        expect(screen.getByTestId("Incomplete")).toBeInTheDocument();
    });
});