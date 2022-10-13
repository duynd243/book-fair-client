import { IRole, ROLES } from './Roles';

interface IProtectedRoute {
    path: string;
    allowedRoles: IRole[];
}

export const PROTECTED_ROUTES: IProtectedRoute[] = [
    {
        path: '/admin',
        allowedRoles: [ROLES.ADMIN],
    },
    {
        path: '/protected',
        allowedRoles: [ROLES.ADMIN, ROLES.CUSTOMER],
    },
];
