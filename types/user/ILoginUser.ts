export interface ILoginUser {
    userId: string;
    accessToken: string;
    isFirstLogin: boolean;
    email: string;
    name: string;
    address: string;
    phoneNumber: string;
    dob?: Date;
    role: number;
    imageUrl: string;
    organizations?: number[];
}
