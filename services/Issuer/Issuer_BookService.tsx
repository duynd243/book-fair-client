import React from 'react';
import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { IBookResponse } from '../../types/response/IBookResponse';

export class IssuerBookService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getBooks$Issuer = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<IBookResponse>
        >('/issuer/books', {
            params,
        });
        return response.data;
    };

    createBook$Issuer = async (data: IBookResponse) => {
        const response = await this.axiosClient.post<IBookResponse>(
            '/issuer/books',
            data
        );
        return response.data;
    };
}
