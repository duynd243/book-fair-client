import { IServerUser } from './../types/user/IServerUser';
import axios, { AxiosInstance } from 'axios';
import { LoginResponse } from './../types/response/LoginResponse';
import getAxiosClient from './axiosClient';

export class UserService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    async loginWithFirebaseIdToken(idToken: string) {
        const { data } = await this.axiosClient.post<LoginResponse>(
            '/authenticate/login',
            {
                idToken,
                fcmToken: '',
            }
        );
        return data;
    }

    async getAllUsers() {
        const { data } = await this.axiosClient.get<IServerUser[]>('/users');
        return data;
    }
}
