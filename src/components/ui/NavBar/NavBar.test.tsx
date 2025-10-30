import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NavBar } from "./NavBar";
import "@testing-library/jest-dom";

vi.mock("../NavLink/NavLink", () => ({
    NavLink: () => <a data-testid="/testlink">Link</a>
}));

describe("NavBar", () => {

    it('renders NavBar component', () => {
        render(<NavBar />);
        const navbar = screen.getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    })

    it('renders the logo in the navbar', () => {
        render(<NavBar />);
        const logos = screen.getAllByTestId('logo');
        expect(logos.length).toBe(2);
        
        expect(logos[0].tagName).toBe('A');
    })

    it('renders navigation links', () => {
        render(<NavBar />)
        expect(screen.getByTestId('navbar-links')).toBeInTheDocument();
        expect(screen.getAllByText('Link').length).toBeGreaterThan(0);
    })

    it('has an upgrade button', () => {
        render(<NavBar />)
        expect(
            screen.getByRole("button", { name: /upgrade/i })
        ).toBeInTheDocument();
    })

    it('renders profile button', () => {
        render(<NavBar />)
        expect(screen.getAllByTestId('profile').length).toBe(2);
    })

    it('renders the hamburger menu button on smaller screens', () => {
        render(<NavBar />)
        const hamburgerButton = screen.getByTestId('hamburger-button');
        expect(hamburgerButton).toHaveClass('block', 'md:hidden');
    })

    it('toggles the navbar links, logo and upgrade button on smaller screens when hamburger menu is clicked', () => {
        render(<NavBar />)

        const navbarContent = screen.getByTestId('navbar-content');

        expect(navbarContent).toHaveClass('-translate-x-full');

        const hamburgerButton = screen.getByTestId('hamburger-button');
        expect(hamburgerButton).toBeInTheDocument();

        fireEvent.click(hamburgerButton);

        expect(navbarContent).toHaveClass('translate-x-0');
    });

    it('hides the navbar links, logo and upgrade button on smaller screens when close icon is clicked', () => {
        render(<NavBar />)

        const navbarContent = screen.getByTestId('navbar-content');

        expect(navbarContent).toHaveClass('-translate-x-full');

        const hamburgerButton = screen.getByTestId('hamburger-button');
        expect(hamburgerButton).toBeInTheDocument();

        fireEvent.click(hamburgerButton);

        expect(navbarContent).toHaveClass('translate-x-0');

        const closeButton = screen.getByTestId('close-button');   
        fireEvent.click(closeButton);

        expect(navbarContent).toHaveClass('-translate-x-full');
    })
})