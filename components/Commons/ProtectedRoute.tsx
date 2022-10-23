import { IProtectedRoute } from 'constants/ProtectedRoutes';
import { getRoleByName } from 'constants/Roles';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

type Props = {
    children: ReactNode;
    routeData: IProtectedRoute;
};

const ProtectedRoute: React.FC<Props> = ({ children, routeData }) => {
    const { user, loginUser } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (
                !user ||
                !loginUser ||
                (routeData.allowedRoles !== 'all' &&
                    !routeData.allowedRoles.includes(
                        getRoleByName(loginUser?.role)
                    ))
            ) {
                await router.push('/?unauthorized=true');
            } else setIsChecking(false);
        })().catch((err) => console.log(err));
    }, [user, router, routeData.allowedRoles, loginUser]);
    return <>{!isChecking && children}</>;
};

export default ProtectedRoute;
