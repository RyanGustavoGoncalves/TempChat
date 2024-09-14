import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const ButtonShowPassword = ({ setPasswordPreview, passwordPreview, ...rest }) => {
    return (
        <Button type="button" variant={'ghost'} size={'icon'} onClick={() => { setPasswordPreview(!passwordPreview) }} {...rest}>
            {passwordPreview ? (
                <Eye width={18} />
            ) : (
                <EyeOff width={18} />
            )}
        </Button>
    )
}

export default ButtonShowPassword;