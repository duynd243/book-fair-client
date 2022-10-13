import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

type Props = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (!user) {
                await router.push('/login');
            }
        })().then((r) => r);
    }, [user, router]);
    return <>{user && children}</>;
};

export default ProtectedRoute;
