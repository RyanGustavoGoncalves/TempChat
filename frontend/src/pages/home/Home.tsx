import HeaderContent from "@/global/assets/components/headerContent/HeaderContent";
import { User } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
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
    ];

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex">
                <HeaderContent />
                <aside className="hidden flex-col border-r bg-background sm:flex w-72 h-screen">
                    <nav className="grid gap-3 p-6">
                        {items.map((item) => (
                            <React.Fragment key={item.id}>
                                <Link to="/auth/login" className="contents">
                                    <Button variant="ghost" className="flex items-center gap-3 p-0">
                                        <User className="w-1/4" />
                                        <span className="text-base text-muted-foreground truncate w-4/6">
                                            {item.name}
                                        </span>
                                    </Button>
                                </Link>
                                <Separator orientation="horizontal" />
                            </React.Fragment>
                        ))}
                    </nav>
                </aside>

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

                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

                </main>
            </div>
        </div>
    )
}

export default HomePage;