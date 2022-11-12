import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IBaseListResponse } from '../types/response/IBaseListResponse';
import { ICampaign } from '../types/campaign/ICampaign';
import { ICampaignPost } from '../types/joins/ICampaignPost';
import { IOrganizationResponse } from '../types/response/IOrganizationResponse';

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

    getCampaignsByOrganizationId = async (id: any) => {
        const response = await this.axiosClient.get<IOrganizationResponse>(
            `/organizations/${id}/campaigns`
        );
        return response.data;
    };

    getCampaignPostById = async (id: any) => {
        const response = await this.axiosClient.get<ICampaignPost>(
            `/campaigns/posts/${id}`
        );
        return response.data;
    };
}
