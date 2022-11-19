import { ILoginResponse } from './../types/response/ILoginResponse';
import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IBaseListResponse } from '../types/response/IBaseListResponse';
import { IPostResponse } from '../types/response/IPostResponse';
import { IPublisher } from '../types/user/IPublisher';

export class PublisherService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getPublishers = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<IPublisher>
        >('/publishers', {
            params,
        });
        return response.data;
    };
}
