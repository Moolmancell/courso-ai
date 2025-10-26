import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSignUp() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const validateField = (field: string, value: string) => {
        let error = "";

        if (field === "name") {
            if (!value.trim()) error = "Username is required.";
        }

        if (field === "email") {
            if (!value) {
                error = "Email is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Please enter a valid email address.";
            }
        }

        if (field === "password") {
            if (!value) {
                error = "Password is required.";
            } else {
                const strongPassword =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
                if (!strongPassword.test(value)) {
                    error =
                        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
                }
            }
        }

        if (field === "confirmPassword") {
            if (!value) {
                error = "Please confirm your password.";
            } else if (value !== password) {
                error = "Passwords do not match.";
            }
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    };

    // ✅ update values & validate while typing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);

        validateField(name, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);

        // ✅ Run all validations
        const nameError = validateField("name", name);
        const emailError = validateField("email", email);
        const passwordError = validateField("password", password);
        const confirmPasswordError = validateField("confirmPassword", confirmPassword);

        if (nameError || emailError || passwordError || confirmPasswordError) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (!res.ok) {
                setSubmitError(data.message || "Signup failed");
            } else {
                router.push("/login");
            }
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        email,
        password,
        confirmPassword,
        errors,
        loading,
        submitError,
        handleChange,
        handleSubmit,        
    }
}