import { IOrganization } from '../organization/IOrganization';

export interface IUser {
    id?: string;
    code?: string;
    name?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    role?: number;
    dob?: string;
    status?: boolean;
    imageUrl?: string;
    organizations?: IOrganization[];
}
