import { IRole } from './../types/user/IRole';
export class Roles {
    static readonly SYSTEM: IRole = {
        id: 0,
        name: 'system',
        displayName: 'System',
    };
    static readonly MANAGER: IRole = {
        id: 1,
        name: 'manager',
        displayName: 'Manager',
    };
    static readonly ISSUER: IRole = {
        id: 2,
        name: 'issuer',
        displayName: 'Issuer',
    };
    static readonly USER: IRole = {
        id: 3,
        name: 'user',
        displayName: 'User',
    };
}

export function getRoleById(id: number): IRole {
    return Object.values(Roles).find((role) => role.id === id);
}

export function getRoleByName(name: string): IRole {
    return Object.values(Roles).find(
        (role) => role.name.toLowerCase() === name.toLowerCase()
    );
}
