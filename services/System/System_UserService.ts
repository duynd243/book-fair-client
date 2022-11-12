import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { IUser } from '../../types/user/IUser';

export class SystemUserService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getUsers$System = async (params?: any) => {
        const response = await this.axiosClient.get<IBaseListResponse<IUser>>(
            '/admin/users',
            {
                params,
            }
        );
        return response.data;
    };
}
