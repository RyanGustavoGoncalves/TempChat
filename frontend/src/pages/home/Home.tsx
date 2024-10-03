import '../../global/assets/css/overflow.css';
import HeaderContent from "@/global/assets/components/headerContent/HeaderContent";
import { CircleUser, EllipsisVertical } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {

    const items = [
        { id: 1, name: 'Rodrigo Pereira Gonçalves' },
        { id: 2, name: 'Maria Silva' },
        { id: 3, name: 'João Souza' },
        { id: 4, name: 'José Pereira' },
        { id: 5, name: 'Ana Maria' },
        { id: 6, name: 'Rodrigo Pereira Gonçalves' },
        { id: 7, name: 'Maria Silva' },
        { id: 8, name: 'João Souza' },
        { id: 9, name: 'José Pereira' },
        { id: 10, name: 'Ana Maria' },
        { id: 11, name: 'Rodrigo Pereira Gonçalves' },
        { id: 12, name: 'Maria Silva' },
        { id: 13, name: 'João Souza' },
        { id: 14, name: 'José Pereira' },
        { id: 15, name: 'Ana Maria' },
        { id: 16, name: 'Rodrigo Pereira Gonçalves' },
        { id: 17, name: 'Maria Silva' },
        { id: 18, name: 'João Souza' },
        { id: 19, name: 'José Pereira' },
        { id: 20, name: 'Ana Maria' },
    ];

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex">
                <HeaderContent />
                <aside className="hidden flex-col border-r bg-background sm:flex w-80 h-screen overflow-auto menu-overflow">
                    <nav className="grid gap-6 p-6">
                        <div className="flex justify-between">
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

                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="flex justify-around items-center w-full">
                        <Breadcrumb className="hidden md:flex">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="#">Overview</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to="#">All</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 w-full
                sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {items.map((item, index) => (
                            <div key={item.id} className="flex flex-col items-center p-4 bg-background rounded-lg shadow-md">
                                <CircleUser className="w-20" />
                                <span className="text-lg text-muted-foreground truncate w-4/5 text-center">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div >
    )
}

export default HomePage;