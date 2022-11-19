import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { ICampaign } from '../../types/campaign/ICampaign';

export class IssuerCampaignService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getCampaignById$Issuer = async (id: any) => {
        const response = await this.axiosClient.get<ICampaign>(
            `/issuer/campaigns/${id}`
        );
        return response.data;
    };

    getCampaigns$Issuer = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<ICampaign>
        >('/issuer/campaigns/', {
            params,
        });
        return response.data;
    };

    getOtherCampaigns$Issuer = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<ICampaign>
        >('/issuer/campaigns/other', {
            params,
        });
        return response.data;
    };
}
