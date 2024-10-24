import { toast } from "sonner";

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logout', {
        description: 'You have been successfully logged out.'
    });
    window.location.href = '/auth/login';
}