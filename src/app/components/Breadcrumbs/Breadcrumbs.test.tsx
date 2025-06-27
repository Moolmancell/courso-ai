import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom"
import { Breadcrumbs } from "./Breadcrumbs";

const originalLocation = window.location;

describe('Breadcrumbs', () => {
    beforeEach(() => {
        // Restore the original window.location before each test
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalLocation,
        });
    });

    it('Breadcrumbs exists', () => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { pathname: '/dashboard' },
        });

        render(<Breadcrumbs/>)
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    })

    it('renders the right links', () => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { pathname: '/dashboard' },
        });

        render(<Breadcrumbs/>)
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.queryByText('Courses')).not.toBeInTheDocument();
    })

    it('renders the right links (part 2)', () => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { pathname: '/dashboard/courses' },
        });

        render(<Breadcrumbs/>)
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Courses')).toBeInTheDocument();
    })
})
