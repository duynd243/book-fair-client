import { IRole } from '../types/user/IRole';

export class Roles {
    static readonly SYSTEM: IRole = {
        id: 0,
        name: 'system',
        displayName: 'Hệ thống',
        defaultRoute: '/admin',
    };
    static readonly MANAGER: IRole = {
        id: 1,
        name: 'manager',
        displayName: 'Manager',
        defaultRoute: '/admin',
    };
    static readonly ISSUER: IRole = {
        id: 2,
        name: 'issuer',
        displayName: 'Nhà phát hành',
        defaultRoute: '/issuer',
    };
    static readonly CUSTOMER: IRole = {
        id: 3,
        name: 'customer',
        displayName: 'Khách hàng',
        defaultRoute: '/',
    };
}

export function getRoleById(id: number): IRole {
    return Object.values(Roles).find((role) => role.id === id);
}

export function getRoleByName(name: string): IRole {
    return Object.values(Roles).find(
        (role) => role.name.toLowerCase() === name?.toLowerCase()
    );
}
