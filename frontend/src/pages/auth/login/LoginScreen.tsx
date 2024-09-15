import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { verifyType } from "@/global/assets/utils/verifyType/verifyType";
import ButtonShowPassword from "../assets/components/ButtonShowPassword";
import { loginUser } from "./assets/utils/loginUser";

const LoginScreen = () => {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [passwordPreview, setPasswordPreview] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        loginUser(e, credential, password);
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
                                type={verifyType(credential)}
                                placeholder="m@example.com"
                                required
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
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
