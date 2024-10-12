import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, PanelLeft } from "lucide-react";
import UserProfile from "../userProfile/UserProfile";
import { ModeToggle } from "@/components/ModeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "../../utils/logout/logout";

const HeaderContent = () => {
    /**
     * This navbar mobile component is responsible for rendering the header of the application.
     */
    return (
        <header className="sticky top-0 z-100 p-6 flex h-screen gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid grid-cols-1 justify-between h-full w-full gap-6 text-lg font-medium">
                        <Link
                            to="/"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <MessageCircle className="h-5 w-5 transition-all group-hover:scale-110" />
                        </Link>
                        <div className="flex items-end justify-between w-full">
                            <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="overflow-hidden rounded-full"
                                        >
                                            <UserProfile />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Settings</DropdownMenuItem>
                                        <DropdownMenuItem>Support</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => { logout() }}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <span>{JSON.parse(localStorage.getItem('user')).username}</span>
                            </div>
                            <ModeToggle />
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )

}

export default HeaderContent;