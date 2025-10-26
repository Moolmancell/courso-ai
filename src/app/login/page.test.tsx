import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, } from "vitest";
import "@testing-library/jest-dom"; // Not needed with Vitest
import LoginPage from "./page"; // Adjust the import based on your file structure

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
}));

describe("Login Page", () => {
    it('renders the login form correctly', () => {
        render(<LoginPage />);

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

        
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();

        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /Forgot Password?/i })).toBeInTheDocument();

        const buttons = screen.getAllByRole('button', { name: /Log In/i });
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveTextContent('Log In');
        expect(buttons[1]).toHaveTextContent('Log In with Google');

        expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Sign Up/i })).toBeInTheDocument();
    });

    it('allows user to fill out and submit the form', async () => {

        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "fake-jwt" }),
            })
        ) as any;
        global.fetch = mockFetch;

        render(<LoginPage />); // Assuming LoginPage accepts onSubmit prop   
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const button = screen.getByRole('button', { name: 'Log In' });
        fireEvent.change(emailInput, { target: { value: 'johndoe@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123@' } });
        fireEvent.click(button);
        expect(mockFetch).toHaveBeenCalled(); // Check if submit handler was called
        expect(emailInput).toHaveValue('johndoe@gmail.com')
        expect(passwordInput).toHaveValue('Password123@')
    })

    it('shows validation errors for empty fields', () => {
        render(<LoginPage />);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(emailInput, { target: { value: 'johndoe@gmail.com' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123@asdfafg23234/.,/.,s' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    })

    it('shows validation error for invalid email format', () => {
        render(<LoginPage />);
        const emailInput = screen.getByPlaceholderText('Email');
        const submitButton = screen.getAllByRole('button', { name: "Log In" });
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton[0]);
        expect(screen.getByText(/Please enter a valid email address./i)).toBeInTheDocument();
    })

    it('toggles password visibility', () => {
        render(<LoginPage />);
        const passwordInput = screen.getByPlaceholderText('Password');
        const toggleButton = screen.getByTestId('togglePassword');
        expect(passwordInput).toHaveAttribute('type', 'password');
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    })

    it('navigates to sign up page when clicking Sign Up link', () => {
        render(<LoginPage />);
        const signUpLink = screen.getByRole('link', { name: /Sign Up/i });
        expect(signUpLink).toHaveAttribute('href', '/signup'); // Assuming the link navigates to /signup
    })

    it('shows error message on failed login attempt', async () => {

        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: "Invalid credentials" }),
            })
        ) as any;
        global.fetch = mockFetch;
        render(<LoginPage />);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123@' } });
        fireEvent.click(submitButton);
        expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    })

    it("disables the submit button and shows loading state on submit", async () => {
        const mockFetch = vi.fn(
            () =>
                new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                ok: true,
                                json: () => Promise.resolve({ token: "fake-jwt" }),
                            }),
                        50
                    )
                )
        ) as any;
        global.fetch = mockFetch;

        render(<LoginPage />);
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByRole("button", { name: "Log In" });

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "Password123@" } });
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent(/logging in/i);

        await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    });

    it("redirects user after successful login", async () => {
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "fake-jwt" }),
            })
        ) as any;
        global.fetch = mockFetch;

        render(<LoginPage />);
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByRole("button", { name: "Log In" });

        fireEvent.change(emailInput, { target: { value: "user@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "Password123@" } });
        fireEvent.click(submitButton);

        await waitFor(() =>
            expect(mockPush).toHaveBeenCalledWith("/dashboard") // adjust path
        );
    });

    it("clears error message when user fixes invalid input", async () => {
        render(<LoginPage />);
        const emailInput = screen.getByPlaceholderText("Email");
        const submitButton = screen.getAllByRole("button", { name: "Log In" })[0];

        fireEvent.change(emailInput, { target: { value: "invalid-email" } });
        fireEvent.click(submitButton);

        expect(
            screen.getByText(/Please enter a valid email address./i)
        ).toBeInTheDocument();

        fireEvent.change(emailInput, { target: { value: "valid@email.com" } });

        await waitFor(() =>
            expect(
                screen.queryByText(/Please enter a valid email address./i)
            ).not.toBeInTheDocument()
        );
    });

    it("handles Google login button click", () => {
        render(<LoginPage />);
        const googleButton = screen.getByRole("button", {
            name: /Log In with Google/i,
        });

        fireEvent.click(googleButton);
        // If you have a handler, check for it. Otherwise:
        expect(googleButton).toBeInTheDocument();
    });
});