"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleIcon from '@/app/icons/GoogleIcon.svg'
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function SignupPage() {
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

    return (
        <div className="flex flex-col items-center bg-zinc-100 min-h-screen p-4">
            <form onSubmit={handleSubmit} className="bg-white py-12 px-8 rounded-3xl border border-zinc-300 w-full max-w-lg box-border">
                <div className="mb-8">
                    <Image src='/LogoBlack.svg' alt='CourserAI' className="m-auto mb-6" width={147} height={35}></Image>
                    <h1 className="text-2xl font-bold mb-2 text-center">Welcome</h1>
                    <p className="text-center">Lets create your new account.</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="font-semibold text-sm mb-2 block">Username</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className={`
                            ${errors.name ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
                            px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
                            placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
                        `}
                        placeholder="Username"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className="text-xs font-medium text-red-700 mt-2">{errors.name}</p>}
                </div>
                
                <div className="mb-4">
                    <label htmlFor="email" className="font-semibold text-sm mb-2 block">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={`
                            ${errors.email ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
                            px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
                            placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
                        `}
                        placeholder="example@website.com"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-xs font-medium text-red-700 mt-2">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="font-semibold block text-sm mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className={`
                            ${errors.password ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
                            px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
                            placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
                        `}
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="text-xs font-medium text-red-700 mt-2">{errors.password}</p>}
                </div>
                
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="font-semibold block text-sm mb-2">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        className={`
                            ${errors.confirmPassword ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
                            px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
                            placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
                        `}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="text-xs font-medium text-red-700 mt-2">{errors.confirmPassword}</p>}

                </div>
                
                <div className="mt-8 flex flex-col gap-4">
                    <button type="submit" className="blue-button" 
                        disabled={loading 
                                || !!errors.name || !!errors.email 
                                || !!errors.password || !!errors.confirmPassword
                                || name === "" || email === "" || password === ""
                                || confirmPassword === ""
                        }>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>

                    <div className="h-0.5 w-full bg-zinc-300 rounded-full"></div>

                    <button type="button" className="default-button flex flex-row items-center justify-center gap-4">
                        <Image src={GoogleIcon} alt="Google Icon" width={18} height={18} />
                        Sign Up With Google
                    </button>
                </div>

                <p className="text-center mt-8">Already have an account? <a href="/login" className="font-semibold text-sm underline hover:no-underline">Log In</a></p>

            </form>
            
            {submitError && <div className="bg-red-100 rounded-3xl px-3 py-4 border border-red-300 flex flex-row gap-4 items-center">
                <ExclamationTriangleIcon className="size-6 text-red-400" />
                <p className="text-sm font-normal text-red-600">{submitError || 'An unexpected error occurred'}</p>
            </div>}

        </div>
    );
}
