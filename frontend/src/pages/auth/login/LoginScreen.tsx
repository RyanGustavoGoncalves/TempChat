import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { verifyType } from "@/global/assets/utils/verifyType/verifyType";
import ButtonShowPassword from "../assets/components/ButtonShowPassword";

const LoginScreen = () => {
    const [crendential, setCrendential] = useState("");
    const [password, setPassword] = useState("");
    const [passwordPreview, setPasswordPreview] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Consome o endpoint de login
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ crendential, password })
            });

            if (response.ok) {
                const data = await response.json();

                navigate("/dashboard");
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Ocorreu um erro no login. Por favor, tente novamente mais tarde.");
        }
    };

    return (
        <main className="h-screen grid place-items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Entre com seu e-mail abaixo para acessar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email or Username</Label>
                            <Input
                                id="crendential"
                                type={verifyType(crendential)}
                                placeholder="m@example.com"
                                required
                                value={crendential}
                                onChange={(e) => setCrendential(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link to={"#"} className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="flex justify-end">
                                <Input
                                    id="password"
                                    type={passwordPreview ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <ButtonShowPassword passwordPreview={passwordPreview} setPasswordPreview={setPasswordPreview} className="absolute m-0" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Github size={24} />
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Não tem uma conta?{" "}
                        <Link to={"/auth/register"} className="underline">
                            Cadastre-se
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default LoginScreen;
