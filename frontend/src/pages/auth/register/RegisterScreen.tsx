import { useState } from "react";

interface FormData {
    username: string;
    email: string;
    password: string;
    file: File | null; // Adicionando o tipo File
}

const RegisterScreen = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        file: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files) {
            setFormData({ ...formData, [name]: files[0] }); // Atualiza o estado com o arquivo selecionado
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            const response = await fetch('http://localhost:8080/api/v1/user/auth/register', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.status === 201) {
                console.log('User registered successfully!');

            } else if (response.status === 400) {
                const errorData = await response.json();
                const errorArray = [];

                for (const fieldName in errorData) {
                    const errorMessage = errorData[fieldName];
                    errorArray.push({ fieldName, errorMessage });
                }

                console.log(errorArray);
            } else {
                console.log('Error: ' + response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="file">Upload File:</label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}

export default RegisterScreen;