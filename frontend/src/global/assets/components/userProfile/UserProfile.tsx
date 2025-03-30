import React, { useEffect, useState } from 'react';
import { getUserData } from '../../utils/scripts/getUserData/getUserData';

interface User {
    username: string;
    picture: string | null;
}

const UserProfile: React.FC = () => {

    const [data, setData] = useState<null>(null);
    const [profileImageURL, setProfileImageURL] = useState<string | null>(null);

    useEffect(() => {
        getUserData().then((data) => {
            setData(data);

            if (data && data.picture) {
                setProfileImageURL(`data:image/png;base64,${data.picture}`);
            }
        });
    }, []);


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
        profileImageURL ? (
            <img
                src={profileImageURL}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
            />
        ) : null
    );
};

export default UserProfile;
