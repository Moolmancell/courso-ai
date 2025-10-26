// components/ui/FormField.tsx
"use client";

import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, id, name, error, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id || name} className="font-semibold text-sm mb-2 block">
        {label}
      </label>
      <input
        id={id || name}
        name={name}
        className={`
          ${error ? "border-red-400 bg-red-50" : "bg-white border-zinc-300"}
          px-4 py-3 rounded-3xl border focus:outline-none focus:border-2 focus:bg-white focus:border-blue-300
          placeholder:text-zinc-700 placeholder:font-normal text-sm w-full
        `}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-700 mt-2">{error}</p>}
    </div>
  );
};