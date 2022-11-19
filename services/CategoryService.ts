import { ILoginResponse } from './../types/response/ILoginResponse';
import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IBaseListResponse } from '../types/response/IBaseListResponse';
import { IPostResponse } from '../types/response/IPostResponse';
import { IPublisher } from '../types/user/IPublisher';
import { ICategory } from '../types/category/ICategory';

export class CategoryService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getCategories = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<ICategory>
        >('/categories', {
            params,
        });
        return response.data;
    };
}
