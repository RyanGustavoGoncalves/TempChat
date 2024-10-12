import React from 'react';

interface User {
    username: string;
    picture: string | null;
}

const UserProfile: React.FC = () => {
    const userData = localStorage.getItem('user');
    const user: User | null = userData ? JSON.parse(userData) : null;

    const getInitials = (username: string): string => {
        const trimmedUsername = username.trim();
        const names = trimmedUsername.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    if (!user) {
        return null;
    }

    if (!user.picture || user.picture === 'null') {
        return (
            <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-full text-primary-foreground">
                <span className="text-lg font-semibold">{getInitials(user.username)}</span>
            </div>
        );
    }

    return (
        <img
            src={user.picture}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
        />
    );
};

export default UserProfile;
