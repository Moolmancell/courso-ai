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
    expect(screen.getByRole("button", { name: "Google Icon Sign Up With Google" })).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("example@website.com"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password123@" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "Password123@" },
    });

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText('example@website.com'), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it('shows error for invalid email format', () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText("example@website.com"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('shows error for weak password', () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(screen.getByText("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.")).toBeInTheDocument();
  })

  it("shows error when passwords do not match", async () => {
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const mockFetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: "Signup successful" }),
        })
    ) as any;
    global.fetch = mockFetch;

    render(<SignupPage />); // ensure your page accepts onSubmit or mock API

    fireEvent.change(screen.getByPlaceholderText("Username"), {
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

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledOnce(); // adjust route if needed
    });
  });

  it('shows error if something went wrong during submission', async () => {
        render(<SignupPage />);
        const mockFetch = vi.fn(() =>
        Promise.resolve({ 
            ok: false,
            json: () => Promise.resolve({ message: "Signup failed" }),
        })
        ) as any;
        global.fetch = mockFetch;

        fireEvent.change(screen.getByPlaceholderText("Username"), {
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

        fireEvent.click(screen.getByRole("button", { name: "Sign Up"}));

        expect(await screen.findByText(/Signup failed/i)).toBeInTheDocument();
    })
})
