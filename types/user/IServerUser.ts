export interface IServerUser {
    userId: string;
    accessToken: string;
    isFirstLogin: boolean;
    email: string;
    name: string;
    address: string;
    phoneNumber: string;
    dob?: Date;
    role: string;
    imageUrl: string;
}
