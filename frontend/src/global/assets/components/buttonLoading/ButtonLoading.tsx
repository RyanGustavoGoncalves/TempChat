import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ButtonLoading = ({ children, loading, variant = "default", type = "button", ...rest }) => {
    return (
        <Button {...rest} disabled={loading} variant={variant} type={type}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
        </Button>
    );
};

export default ButtonLoading;
