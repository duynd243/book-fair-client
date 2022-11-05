import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IBaseListResponse } from '../types/response/IBaseListResponse';
import { ICampaign } from '../types/campaign/ICampaign';

export class CampaignService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getCampaigns = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<ICampaign>
        >('/campaigns', {
            params,
        });
        return response.data;
    };
    getCampaignById = async (id: any) => {
        const response = await this.axiosClient.get<ICampaign>(
            `/campaigns/${id}`
        );
        return response.data;
    };

    getCampaignPostById = async (id: any) => {
        const response = await this.axiosClient.get<ICampaign>(
            `/campaigns/posts/${id}`
        );
        return response.data;
    };
}
