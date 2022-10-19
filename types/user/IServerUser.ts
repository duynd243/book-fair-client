import { IRole } from './IRole';
export interface IServerUser {
    accessToken: string;
    fullName: string;
    dob: Date;
    gender: string;
    role: IRole;
    imageUrl: string;
}

const user: IServerUser = {
    accessToken: '',
    fullName: '',
    dob: new Date(2022),
    gender: 'Male',
    role: {
        id: 1,
        name: 'admin',
        displayName: 'Admin',
    },
    imageUrl: '',
};
