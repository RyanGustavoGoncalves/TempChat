import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ButtonLoading = ({ children, loading, ...rest, variant, type }) => {
    return (
        <Button {...rest} disabled={loading} variant={variant}>
            {loading ? <Loader2 /> : children}
        </Button>
    );
};