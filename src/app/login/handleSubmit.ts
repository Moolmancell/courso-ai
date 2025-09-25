export default async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/login", { // change route later
        method: "POST",
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
        }),
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Login failed");
    }

    /*
    
    // Save JWT token
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
        
    */

    return data
}