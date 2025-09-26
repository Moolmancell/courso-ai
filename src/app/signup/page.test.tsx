import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import SignupPage from "./page"; // adjust path if needed

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe("Signup Page", () => {
  it("renders the signup form", () => {
    render(<SignupPage />);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example@website.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up With Google" })).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<SignupPage />);
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    screen.debug();
    expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it.todo('shows error for invalid email format', () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it.todo('shows error for weak password', () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByText(/Password must be at least 8 characters and include uppercase, lowercase, number, and special character/i)).toBeInTheDocument();
  })

  it.todo("shows error when passwords do not match", async () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it.todo("submits form with valid data", async () => {
    const mockFetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: "Signup successful" }),
        })
    ) as any;
    global.fetch = mockFetch;

    render(<SignupPage />); // ensure your page accepts onSubmit or mock API

    fireEvent.change(screen.getByPlaceholderText("John Doe"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("example@website.com"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password123@" },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: "Password123@" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledOnce(); // adjust route if needed
    });
  });

  it.todo('shows error if something went wrong during submission', async () => {
        render(<SignupPage />);
        const mockFetch = vi.fn(() =>
        Promise.resolve({ 
            ok: false,
            json: () => Promise.resolve({ message: "Signup failed" }),
        })
        ) as any;
        global.fetch = mockFetch;

        fireEvent.change(screen.getByPlaceholderText("John Doe"), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByPlaceholderText("example@website.com"), {
            target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "Password123@" },
        });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
            target: { value: "Password123@" },
        });

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        expect(await screen.findByText(/Signup failed/i)).toBeInTheDocument();
    })
})
