// components/ui/PasswordInput.tsx
"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const PasswordField: React.FC<PasswordInputProps> = ({ label, id, name, error, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <label htmlFor={id || name} className="font-semibold block text-sm mb-2">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    id={id || name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    className={`
            ${error ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
            px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
            placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
          `}
                    {...props}
                />
                <button
                    data-testid="togglePassword"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-700 cursor-pointer"
                >
                    {showPassword ? (
                        <EyeSlashIcon className="w-6 h-auto" />
                    ) : (
                        <EyeIcon className="w-6 h-auto" />
                    )}
                </button>
            </div>
            {error && <p className="text-xs font-medium text-red-700 mt-2">{error}</p>}
        </div>
    );
};