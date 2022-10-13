export interface IRole {
    id: number | string
    name: string
    displayName: string
}
export class ROLES {
    static readonly ADMIN: IRole = {
        id: 1,
        name: 'admin',
        displayName: 'Admin',
    }
    static readonly CUSTOMER: IRole = {
        id: 2,
        name: 'customer',
        displayName: 'Customer',
    }
}
