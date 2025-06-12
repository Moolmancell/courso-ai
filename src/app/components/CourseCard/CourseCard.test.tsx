import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CourseCard } from './CourseCard';
import "@testing-library/jest-dom"

describe("CourseCard Rendering", () => {
    beforeEach(async () => {
        render(<CourseCard title="Sample Title" progress={20} source="udemy" courseLink='/12345678'/>)
    })

    it("renders the CourseCard component", () => {
        const component = screen.getByText("Sample Title")
        expect(component).toBeInTheDocument();
    })

    it("renders the title", () => {
        const component = screen.getByText("Sample Title")
        expect(component).toBeInTheDocument();  
    })

    it("renders the progress", () => {
        const component = screen.getByText("20% Completed")
        expect(component).toBeInTheDocument();  
    })

    it("renders the CourseTag", () => {
        const component = screen.getByText("Udemy")
        expect(component).toBeInTheDocument();  
    })

    it("renders the Button", () => {
        const component = screen.getByRole('link', {name: 'Continue'})        
        expect(component).toBeInTheDocument();
    })

    it("progress is zero then render button to 'Start'", () => {
        render(<CourseCard title="Sample Title" progress={0} source='coursera' courseLink='/1234'/>)
        const component = screen.getByRole('link', {name: 'Start'})

        expect(component).toBeInTheDocument();
    })

    it("progress bar exists", () => {
        const component = screen.getByTestId("progress-bar")
        expect(component).toBeInTheDocument();
    })

    it("progress bar indicates progress", () => {
        const componentInner = screen.getByTestId("progress-bar").firstChild as HTMLElement;
        expect(componentInner).toHaveStyle('width: 20%')        
    })
})
