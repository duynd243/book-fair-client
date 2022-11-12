import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IPostResponse } from '../types/response/IPostResponse';

export class PostService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getPostById = async (id: any) => {
        const response = await this.axiosClient.get<IPostResponse>(
            `/posts/${id}`
        );
        return response.data;
    };
}
