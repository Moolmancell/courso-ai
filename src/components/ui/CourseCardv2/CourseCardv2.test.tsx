import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/dom";
import '@testing-library/jest-dom';
import { CourseCardv2 } from "./CourseCardv2";
import { cleanup, render } from "@testing-library/react";
import { beforeEach } from "vitest";

describe("CourseCardv2", () => {
    beforeEach(() => {
        render(<CourseCardv2 id={1} lessons={10} title="Foundations of User Experience UX Design" progress={23} courseLink="/"/>)
    })
    it("displays the lessons lessons", () => {
        expect(screen.getByText("10 Lessons")).toBeInTheDocument();
    })
    it("displays course title", () => {
        expect(screen.getByText("Foundations of User Experience UX Design")).toBeInTheDocument()
    });
    it("displays course progress", () => {
        expect(screen.getByText("23% Completed")).toBeInTheDocument()
    })
    it("displays progress bar", () => {
        expect(screen.getByTestId("progress-bar")).toHaveStyle('width: 23%')
    })
    it("displays the continue button when progress is above 0", () => {
        expect(screen.getByRole("link", {name: "Continue"})).toBeInTheDocument();
    })
    it("displays the start button when progress is 0", () => {
        cleanup()
        render(<CourseCardv2 id={1} lessons={10} title="Foundations of User Experience UX Design" progress={0} courseLink="/"/>)
        expect(screen.getByRole("link", {name: "Start"})).toBeInTheDocument();
    })
})