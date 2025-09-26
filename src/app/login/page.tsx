"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import handleSubmit from "./handleSubmit";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import GoogleIcon from '@/app/icons/GoogleIcon.svg'

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
        <div className="flex flex-col items-center bg-zinc-100 min-h-screen p-4">
            <form onSubmit={callHandleSubmit} className="bg-white py-12 px-8 rounded-3xl border border-zinc-300 w-full max-w-lg box-border">
                <div className="mb-8">
                    <Image src='/LogoBlack.svg' alt='CourserAI' className="m-auto mb-6" width={147} height={35}></Image>
                    <h1 className="text-2xl font-bold mb-2 text-center">Welcome Back!</h1>
                    <p className="text-center">Log in to your account</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="font-semibold text-sm mb-2 block">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={`
                        ${errors.email ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
                        px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
                        placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
                    `}
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-xs font-medium text-red-700 mt-2">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="font-semibold block text-sm mb-2">Password</label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`
                        ${errors.password ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
                        px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
                        placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
                    `}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            data-testid="togglePassword"
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-700"
                        >
                            {
                                showPassword ?
                                    <EyeSlashIcon className="w-6 h-auto" />
                                    :
                                    <EyeIcon className="w-6 h-auto" />
                            }
                        </button>
                    </div>
                    {errors.password && <p className="text-xs font-medium text-red-700 mt-2">{errors.password}</p>}
                    <p className="mt-4 font-semibold text-right ">
                        <a href="/signup" className="text-sm underline hover:no-underline">Forgot Password?</a>
                    </p>

                </div>
                <div className="mt-8 flex flex-col gap-4">
                    <button type="submit" className="blue-button" disabled={loading || !!errors.email || !!errors.password}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                    <div className="h-0.5 w-full bg-zinc-300 rounded-full"></div>

                    <button type="button" className="default-button flex flex-row items-center justify-center gap-4">
                        <Image src={GoogleIcon} alt="Google Icon" width={18} height={18}/>
                        <span>
                            Log In with Google
                        </span>
                    </button>
                </div>
                <p className="text-center mt-8">Don't have an account? <a href="/signup" className="font-semibold text-sm underline hover:no-underline">Sign Up</a></p>
            </form>

            {submitError && <p className="error">{submitError}</p>}

        </div>
    );
}
