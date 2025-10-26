import { renderHook, act, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock, afterEach } from 'vitest';
import { useLoginForm } from './useLoginForm';
import "@testing-library/jest-dom"

const mockRouterPush = vi.fn();
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}))

global.fetch = vi.fn();

const createChangeEvent = (name: string, value: string) => {
    return {
        target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>;
};

const createSubmitEvent = () => {
    return {
        preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;
};

describe('useLoginForm', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        (global.fetch as Mock).mockClear();
        mockRouterPush.mockClear();
    });

    afterEach(() => {
        cleanup();
    });

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useLoginForm());

        expect(result.current.loading).toBe(false);
        expect(result.current.submitError).toBe(null);
        expect(result.current.email).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.errors).toEqual({});
    })

    it("handleChange should update email state and validation errors", () => {
        const { result } = renderHook(() => useLoginForm());

        // Test invalid email
        act(() => {
            result.current.handleChange(createChangeEvent("email", "invalid-email"));
        });

        expect(result.current.email).toBe("invalid-email");
        expect(result.current.errors.email).toBe(
            "Please enter a valid email address."
        );

        // Test valid email
        act(() => {
            result.current.handleChange(
                createChangeEvent("email", "test@example.com")
            );
        });

        expect(result.current.email).toBe("test@example.com");
        expect(result.current.errors.email).toBe(""); // Error should be cleared
    })

    it("handleChange should update password state and validation errors", () => {
        const { result } = renderHook(() => useLoginForm());

        // Test invalid password (too short)
        act(() => {
            result.current.handleChange(createChangeEvent("password", "123"));
        });

        expect(result.current.password).toBe("123");
        expect(result.current.errors.password).toBe(
            "Password must be at least 6 characters."
        );

        // Test valid password
        act(() => {
            result.current.handleChange(createChangeEvent("password", "123456"));
        });

        expect(result.current.password).toBe("123456");
        expect(result.current.errors.password).toBe("");
    });

    it("handleSubmit should prevent submission if validation fails", async () => {
        const { result } = renderHook(() => useLoginForm());
        const mockEvent = createSubmitEvent();

        // Set invalid data
        act(() => {
            result.current.handleChange(createChangeEvent("email", "invalid"));
            result.current.handleChange(createChangeEvent("password", "123"));
        });

        // Attempt to submit
        await act(async () => {
            await result.current.handleSubmit(mockEvent);
        });

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(result.current.loading).toBe(false);
        expect(result.current.errors.email).toBe(
            "Please enter a valid email address."
        );
        expect(result.current.errors.password).toBe(
            "Password must be at least 6 characters."
        );
        expect(global.fetch).not.toHaveBeenCalled(); // API should not be called
        expect(mockRouterPush).not.toHaveBeenCalled(); // Router should not be called
    })

    it("handleSubmit should show errors for empty fields on submit", async () => {
        const { result } = renderHook(() => useLoginForm());
        const mockEvent = createSubmitEvent();

        // Attempt to submit with empty fields
        await act(async () => {
            await result.current.handleSubmit(mockEvent);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.errors.email).toBe("Email is required.");
        expect(result.current.errors.password).toBe("Password is required.");
        expect(global.fetch).not.toHaveBeenCalled();
        expect(mockRouterPush).not.toHaveBeenCalled();
    })

    it("callHandleSubmit should submit successfully and redirect", async () => {
        const { result } = renderHook(() => useLoginForm());
        const mockEvent = createSubmitEvent();

        // Mock a successful API response
        (global.fetch as Mock).mockResolvedValue({
            ok: true,
            json: async () => ({ message: "Login successful" }),
        });

        // Set valid data
        act(() => {
            result.current.handleChange(
                createChangeEvent("email", "test@example.com")
            );
            result.current.handleChange(createChangeEvent("password", "password123"));
        });

        // Ensure no errors before submit
        expect(result.current.errors.email).toBe("");
        expect(result.current.errors.password).toBe("");

        // Use a promise to track the async submit
        const submitPromise = act(async () => {
            await result.current.handleSubmit(mockEvent);
        });

        // Check loading state *during* the submission
        expect(result.current.loading).toBe(false);

        // Wait for the submission to complete
        await submitPromise;

        // Check assertions *after* submission
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith("/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: "test@example.com",
                password: "password123",
            }),
            headers: { "Content-Type": "application/json" },
        });
        expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
        expect(result.current.loading).toBe(false);
        expect(result.current.submitError).toBe(null);
    })

    it("callHandleSubmit should set submitError on API failure (res.ok = false)", async () => {
        const { result } = renderHook(() => useLoginForm());
        const mockEvent = createSubmitEvent();

        // Mock an API error response
        (global.fetch as Mock).mockResolvedValue({
            ok: false,
            json: async () => ({ message: "Invalid credentials" }),
        });

        // Set valid data
        act(() => {
            result.current.handleChange(
                createChangeEvent("email", "test@example.com")
            );
            result.current.handleChange(createChangeEvent("password", "wrongpass"));
        });

        // Attempt to submit
        await act(async () => {
            await result.current.handleSubmit(mockEvent);
        });

        expect(global.fetch).toHaveBeenCalled();
        expect(mockRouterPush).not.toHaveBeenCalled(); // Should not redirect
        expect(result.current.loading).toBe(false);
        expect(result.current.submitError).toBe("Invalid credentials");
    })

    it("handleSubmit should set submitError on network error (fetch throws)", async () => {
        const { result } = renderHook(() => useLoginForm());
        const mockEvent = createSubmitEvent();

        // Mock a network error
        const networkError = new Error("Network request failed");
        (global.fetch as Mock).mockRejectedValue(networkError);

        // Set valid data
        act(() => {
            result.current.handleChange(
                createChangeEvent("email", "test@example.com")
            );
            result.current.handleChange(createChangeEvent("password", "password123"));
        });

        // Attempt to submit
        await act(async () => {
            await result.current.handleSubmit(mockEvent);
        });

        expect(global.fetch).toHaveBeenCalled();
        expect(mockRouterPush).not.toHaveBeenCalled();
        expect(result.current.loading).toBe(false);
        expect(result.current.submitError).toBe("Network request failed");
    })
});