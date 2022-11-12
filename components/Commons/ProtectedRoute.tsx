import { IProtectedRoute } from 'constants/ProtectedRoutes';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getRoleById, Roles } from '../../constants/Roles';

type Props = {
    children: ReactNode;
    routeData: IProtectedRoute;
};

const ProtectedRoute: React.FC<Props> = ({ children, routeData }) => {
    const { loginUser } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (
                !loginUser ||
                (routeData.allowedRoleIDs !== 'all' &&
                    !routeData.allowedRoleIDs.includes(loginUser?.role))
            ) {
                await router.push(
                    loginUser
                        ? getRoleById(loginUser?.role).defaultRoute
                        : Roles.CUSTOMER.defaultRoute
                );
            } else setIsChecking(false);
        })().catch((err) => console.log(err));
    }, [router, routeData.allowedRoleIDs, loginUser]);
    return <>{!isChecking && children}</>;
};

export default ProtectedRoute;
