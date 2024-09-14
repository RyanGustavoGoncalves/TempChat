export const verifyType = (crendential: string) => {
    if (crendential.includes("@")) {
        return "email";
    } else {
        return "text";
    }
};