import '../../global/assets/css/overflow.css';
import HeaderContent from "@/global/assets/components/headerContent/HeaderContent";
import { CircleUser, EllipsisVertical, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

const HomePage = () => {

    const items = [
        { id: 1, name: 'Rodrigo Pereira Gonçalves', message: 'Hello World!' },
        { id: 2, name: 'Carlos Eduardo Gonçalves', message: 'Oi Galera!' },
        { id: 3, name: 'João Pedro Gonçalves', message: 'Hello World!' },
        { id: 4, name: 'Maria Eduarda Gonçalves', message: 'Hello World!' },
        { id: 5, name: 'Ana Clara Gonçalves', message: 'Hello World!' },
        { id: 6, name: 'José Carlos Gonçalves', message: 'Hello World!' },
        { id: 7, name: 'Rafaela Gonçalves', message: 'Hello World!' },
        { id: 8, name: 'Gabriela Gonçalves', message: 'Hello World!' },
        { id: 9, name: 'Lucas Gonçalves', message: 'Hello World!' },
        { id: 10, name: 'Pedro Gonçalves', message: 'Implicações de Segurança: Conceder acesso de exclusão a tabelas do sistema pode representar riscos de segurança. Certifique-se de que isso é absolutamente necessário e avalie os impactos potenciais.' },
        { id: 11, name: 'Paulo Gonçalves', message: 'To testando em World!' },
        { id: 12, name: 'Paula Gonçalves', message: 'Políticas de acesso entre escopos impedem que sua aplicação exclua registros na tabela!' },
        { id: 13, name: 'Rafael Gonçalves', message: 'Hello World!' },
        { id: 14, name: 'Rafaela Gonçalves', message: 'Hello World!' },
        { id: 15, name: 'Gabriela Gonçalves', message: 'Hello World!' },
        { id: 16, name: 'Lucas Gonçalves', message: 'Hello World!' },
        { id: 17, name: 'Pedro Gonçalves', message: 'Hello World!' },
        { id: 18, name: 'Paulo Gonçalves', message: 'Hello World!' },
        { id: 19, name: 'Paula Gonçalves', message: 'Hello World!' },
        { id: 20, name: 'Rafael Gonçalves', message: 'Hello World!' },
        { id: 21, name: 'Rafaela Gonçalves', message: 'Hello World!' },
        { id: 22, name: 'Gabriela Gonçalves', message: 'Hello World!' },
        { id: 23, name: 'Lucas Gonçalves', message: 'Hello World!' },
        { id: 24, name: 'Pedro Gonçalves', message: 'Hello World!' },
        { id: 25, name: 'Paulo Gonçalves', message: 'Hello World!' },
        { id: 26, name: 'Paula Gonçalves', message: 'Hello World!' },

    ];

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex">
                <HeaderContent />
                <aside className="hidden flex-col border-r bg-background sm:flex w-80 h-screen overflow-auto menu-overflow">
                    <nav className="grid gap-2 px-6">
                        <div className="flex justify-between items-center sticky top-0 p-1 h-14 bg-background">
                            <span className="text-lg">Conversations</span>
                            <EllipsisVertical width={16} />
                        </div>

                        <div className="grid gap-1">
                            {items.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <Link to="/auth/login" className="contents">
                                        <Button variant="ghost" className="flex items-center gap-3 p-0">
                                            <CircleUser className="w-1/4" />
                                            <span className="text-base text-muted-foreground truncate w-4/6 text-start">
                                                {item.name}
                                            </span>
                                        </Button>
                                    </Link>
                                    {index < items.length - 1 && <Separator orientation="horizontal" />}
                                </React.Fragment>
                            ))}

                        </div>
                    </nav>
                </aside>

                <main className="flex flex-col flex-1 items-start gap-4 md:p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Card className='w-full h-full flex flex-col gap-2'>
                        <div>
                            <CardHeader>
                                <div className='flex justify-between'>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <CircleUser />
                                        <h3>Ryan Gonçalves</h3>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className="relative flex-1 md:grow-0">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search..."
                                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                                            />
                                        </div>

                                        <EllipsisVertical width={16} onClick={() => toast.success('TESTE')}/>
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator orientation='horizontal' />
                        </div>

                        <div className='flex flex-col justify-between h-full'>
                            <CardContent className='grid gap-2 max-h-[45rem] overflow-auto menu-overflow'>
                                {items.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <div className='grid gap-2 w-1/2 bg-secondary rounded-sm p-2 px-2'>
                                            <div className='flex gap-2 items-center cursor-pointer'>
                                                <CircleUser />
                                                <h3>{item.name}</h3>
                                            </div>
                                            <span className='text-justify px-4'>{item.message}</span>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </CardContent>
                            <CardFooter className=''>
                                <Input type='text' placeholder='Type a message...' className='w-full rounded-r bg-background' />
                                <Button variant={"outline"} className='rounded-l'><SendHorizonal width={20} /></Button>
                            </CardFooter>
                        </div>
                    </Card>
                </main>
            </div>
        </div >
    )
}

export default HomePage;