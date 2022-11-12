import { IBaseListResponse } from './../types/response/IBaseListResponse';
import { ILoginUser } from './../types/user/ILoginUser';
import { ILoginResponse } from './../types/response/ILoginResponse';
import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';

export class UserService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    loginWithFirebaseIdToken = async (idToken: string) => {
        const response = await this.axiosClient.post<ILoginResponse>(
            '/authenticate/login',
            {
                idToken,
            }
        );
        return response.data;
    };
}
