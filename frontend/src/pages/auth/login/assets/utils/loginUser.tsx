import { toast } from "sonner";

export const loginUser = async (e: React.FormEvent<HTMLFormElement>, credential: string, password: string) => {
    e.preventDefault();

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ credential, password })
        });
        const data = await response.json();

        if (response.ok) {
            toast.success("Sucessfully logged in!");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = '/';
        } else {
            toast.error(data.msg);
            console.error(data);

        }
    } catch (error) {
        toast.error("An error occurred while trying to login");
        console.error(error);
    }
};