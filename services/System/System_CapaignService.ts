import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { ICampaign } from '../../types/campaign/ICampaign';

export class SystemCampaignService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getCampaignById$System = async (id: any) => {
        const response = await this.axiosClient.get<ICampaign>(
            `/admin/campaigns/${id}`
        );
        return response.data;
    };

    getCampaigns$System = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<ICampaign>
        >('/admin/campaigns', {
            params,
        });
        return response.data;
    };

    createCampaign$System = async (data: ICampaign) => {
        const response = await this.axiosClient.post<ICampaign>(
            '/admin/campaigns',
            { ...data }
        );
        return response.data;
    };
}
