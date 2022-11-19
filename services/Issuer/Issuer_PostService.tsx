import React from 'react';
import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { IBookResponse } from '../../types/response/IBookResponse';

export class IssuerPostService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    createPost$Issuer = async (data: any) => {
        const response = await this.axiosClient.post('/issuer/posts', data);
        return response.data;
    };
}
