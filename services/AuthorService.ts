import { ILoginResponse } from './../types/response/ILoginResponse';
import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IBaseListResponse } from '../types/response/IBaseListResponse';
import { IPostResponse } from '../types/response/IPostResponse';
import { IPublisher } from '../types/user/IPublisher';
import { IAuthor } from '../types/author/IAuthor';

export class AuthorService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getAuthors = async (params?: any) => {
        const response = await this.axiosClient.get<IBaseListResponse<IAuthor>>(
            '/authors',
            {
                params,
            }
        );
        return response.data;
    };
}
