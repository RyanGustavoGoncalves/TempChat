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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/auth/register`, {
            method: 'POST',
            body: formDataToSend,
        });

        if (response.status === 201) {
            toast.success("User registered successfully!");
            console.log('User registered successfully!');

        } else if (response.status === 400) {
            const errorData = await response.json();
            const errorArray = [];

            for (const fieldName in errorData) {
                const errorMessage = errorData[fieldName];
                errorArray.push({ fieldName, errorMessage });
            }

        } else {
            toast.error("Error", {
                description: "Please try again later!"
            });
            console.log('Error: ' + response.status);
        }
    } catch (error) {
        toast.error("Error", {
            description: "Internal error, please try again later!"
        });
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
}