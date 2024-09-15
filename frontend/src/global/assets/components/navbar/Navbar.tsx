import { ModeToggle } from "@/components/ModeToggle";
import { AtSign } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="w-full absolute flex items-center justify-between p-3">
            <nav>
                <Link to={"/"}>
                    <AtSign size={32} />
                </Link>
            </nav>

            <ModeToggle />
        </header>
    );
}

export default Navbar;