"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import handleSubmit from "./handleSubmit";

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const validateField = (name: string, value: string) => {
        let error = "";

        if (name === "email") {
            if (!value) {
                error = "Email is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Please enter a valid email address.";
            }
        }

        if (name === "password") {
            if (!value) {
                error = "Password is required.";
            } else if (value.length < 6) {
                error = "Password must be at least 6 characters.";
            } 
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // ✅ update values & validate while typing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);

        validateField(name, value);
    };

    const callHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true);
            setSubmitError(null);

            validateField("email", email);
            validateField("password", password);

            if (errors.email || errors.password) return;

            await handleSubmit(e);

            // ✅ redirect only if login succeeded
            router.push("/dashboard");
        } catch (err: any) {
            setSubmitError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form onSubmit={callHandleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="password">Password</label>
                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
                <button
                    data-testid="togglePassword"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ marginLeft: "8px" }}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && <p className="error">{errors.password}</p>}
                <a href="/signup">Forgot Password?</a>

                <button type="submit" className="blue-button" disabled={loading || !!errors.email || !!errors.password}>
                    {loading ? "Logging in..." : "Log In"}
                </button>

                <button type="button" className="default-button">
                    Log In with Google
                </button>

            </form>

            <p>Don't have an account? <a href="/signup">Sign Up</a></p>

            {submitError && <p className="error">{submitError}</p>}

        </div>
    );
}
