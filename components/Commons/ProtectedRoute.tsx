import { getRoleByName } from 'constants/Roles';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { IRole } from 'types/user/IRole';
import { useAuth } from '../../context/AuthContext';

type Props = {
    children: ReactNode;
    allowedRoles: IRole[];
};

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
    const { user, serverUser } = useAuth();
    const router = useRouter();

    console.log('router.pathname: ', router.pathname);

    useEffect(() => {
        (async () => {
            if (!user) {
                await router.push('/?unauthorized=true');
            }

            // when backend is ready, uncomment this
            // if (
            //     !serverUser ||
            //     !allowedRoles.includes(getRoleByName(serverUser?.role))
            // ) {
            //     await router.push('/?unauthorized=true');
            // }
        })().catch((err) => console.log(err));
    }, [user, router, allowedRoles]);
    return <>{user && children}</>;
};

export default ProtectedRoute;
