import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLoginForm() {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const router = useRouter();

  const validateField = (name: string, value: string): string => {
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
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    // Re-validate on submit
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    if (emailError || passwordError) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Return everything the UI needs
  return {
    loading,
    submitError,
    email,
    password,
    errors,
    handleChange,
    handleSubmit,
  };
}