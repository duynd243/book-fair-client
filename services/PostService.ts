import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IPostResponse } from '../types/response/IPostResponse';
import { IBaseListResponse } from '../types/response/IBaseListResponse';

export class PostService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getPosts = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<IPostResponse>
        >('/posts', {
            params,
        });
        return response.data;
    };

    getPostById = async (id: any) => {
        const response = await this.axiosClient.get<IPostResponse>(
            `/posts/${id}`
        );
        return response.data;
    };
}
