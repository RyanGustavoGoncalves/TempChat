import React from "react";
import { toast } from "sonner";

export const registerUser = async (e: React.FormEvent<HTMLFormElement>, formData: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    if (formData.file) {
        formDataToSend.append('file', formData.file);
    }

    formDataToSend.append(
        'userData',
        new Blob([JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
        })], { type: 'application/json' })
    );

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/auth/register`, {
            method: 'POST',
            body: formDataToSend,
        });

        const data = await response.json();

        if (response.status === 201) {
            toast.success("User registered successfully!");
            console.info('User registered successfully!');
            window.location.href = '/auth/login';
        } else if (response.status === 400) {

            toast.error(data.msg);
            console.log('Error:', data);

        } else {
            toast.error(data.msg);
            console.log('Error:', data);
        }
    } catch (error) {
        toast.error("Internal server error");
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
}