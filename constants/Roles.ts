import { IRole } from './../types/user/IRole';
export class Roles {
    static readonly ADMIN: IRole = {
        id: 1,
        name: 'admin',
        displayName: 'Admin',
    };
    static readonly CUSTOMER: IRole = {
        id: 2,
        name: 'customer',
        displayName: 'Customer',
    };
}

export function getRoleById(id: number) {
    return Object.values(Roles).find((role) => role.id === id);
}

console.log(
    Object.values(Roles)
        .map((r) => JSON.stringify(r))
        .includes(
            JSON.stringify({ id: 2, name: 'customer', displayName: 'Customer' })
        )
);

console.log(getRoleById(2));
