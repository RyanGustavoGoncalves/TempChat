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
import { Items } from '@/global/assets/utils/exData/Items';
import Messages from '@/global/assets/components/messages/Messages';

const HomePage = () => {

    const items = Items;

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

                <main className="flex flex-col flex-1 items-start gap-4 sm:py-0 md:gap-8">
                    <Card className='w-full h-full flex flex-col gap-2 rounded-none'>
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

                                        <EllipsisVertical width={16} onClick={() => toast.success('TESTE')} />
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator orientation='horizontal' />
                        </div>

                        <div className='flex flex-col justify-between flex-1'>
                            <CardContent className='grid gap-2 max-h-[45rem] overflow-auto menu-overflow'>
                                <Messages />
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