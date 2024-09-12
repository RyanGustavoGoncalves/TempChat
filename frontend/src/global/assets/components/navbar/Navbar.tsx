import { ModeToggle } from "@/components/ModeToggle";

const Navbar = () => {
    return (
        <header className="w-full absolute flex items-center">
            <nav>
                <h1 className="text-2xl">TempChat</h1>
            </nav>

            <ModeToggle />
        </header>
    );
}

export default Navbar;