import { Roles } from './Roles';
import { IRole } from 'types/user/IRole';
export interface IProtectedRoute {
    path: string;
    allowedRoles: IRole[];
}

export const PROTECTED_ROUTES: IProtectedRoute[] = [
    {
        path: '/admin',
        allowedRoles: [Roles.ADMIN],
    },
    {
        path: '/protected',
        allowedRoles: [Roles.ADMIN, Roles.CUSTOMER],
    },
];
