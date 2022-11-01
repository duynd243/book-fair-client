import { Roles } from './Roles';
import { IRole } from 'types/user/IRole';

export interface IProtectedRoute {
    path: string;
    allowedRoles: IRole[] | 'all'; // 'all' means all roles are allowed (unauthenticated users are not allowed)
}

export const PROTECTED_ROUTES: IProtectedRoute[] = [
    {
        path: '/admin2',
        allowedRoles: [Roles.SYSTEM],
    },
    {
        path: '/protected',
        allowedRoles: 'all',
    },
];
