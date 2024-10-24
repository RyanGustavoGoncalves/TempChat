export const getUserData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/get`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error(data);
        }
    }
}