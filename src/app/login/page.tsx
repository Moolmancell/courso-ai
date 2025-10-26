"use client";
import Image from "next/image";
import GoogleIcon from '@/assets/icons/GoogleIcon.svg'
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Toast } from "../../components/ui/Toast/Toast";
import { useLoginForm } from "@/features/Login/hooks/useLoginForm";
import { FormField } from "@/components/ui/FormField/FormField";
import { PasswordField } from "@/components/ui/PasswordField/PasswordField";

export default function LoginPage() {
    
    const {
        loading,
        submitError,
        email,
        password,
        errors,
        handleChange,
        handleSubmit,
    } = useLoginForm();

    return (
        <div className="flex flex-col items-center bg-zinc-100 min-h-screen p-4">
            <form onSubmit={handleSubmit} className="bg-white py-12 px-8 rounded-3xl border border-zinc-300 w-full max-w-lg box-border">
                <div className="mb-8">
                    <Image src='/LogoBlack.svg' alt='CourserAI' className="m-auto mb-6" width={147} height={35}></Image>
                    <h1 className="text-2xl font-bold mb-2 text-center">Welcome Back!</h1>
                    <p className="text-center">Log in to your account</p>
                </div>
                
                <FormField
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                />

                <PasswordField
                    label="Password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                />
                <Link href="/forgotpasssword" className="block text-right font-semibold text-sm underline hover:no-underline">Forgot Password?</Link>
                <div className="mt-8 flex flex-col gap-4">
                    <button type="submit" className="blue-button" 
                            disabled={loading 
                                || !!errors.email || !!errors.password
                                || email === "" || password === ""
                            }>
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                    <div className="h-0.5 w-full bg-zinc-300 rounded-full"></div>

                    <button type="button" className="default-button flex flex-row items-center justify-center gap-4">
                        <Image src={GoogleIcon} alt="Google Icon" width={18} height={18} />
                        <span>
                            Log In with Google
                        </span>
                    </button>
                </div>
                <p className="text-center mt-8">Don't have an account? <a href="/signup" className="font-semibold text-sm underline hover:no-underline">Sign Up</a></p>
            </form>

            {submitError && <Toast className="bg-red-100 rounded-2xl text-red-600 px-3 py-4 border border-red-300 flex flex-row gap-4 items-center">
                <ExclamationTriangleIcon className="size-6 text-red-400" />
                <p className="text-sm font-normal text-red-600">{submitError || 'An unexpected error occurred'}</p>
            </Toast>}

        </div>
    );
}
