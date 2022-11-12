import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { ICampaign } from '../../types/campaign/ICampaign';
import { IParticipation } from '../../types/participation/IParticipation';

export class ParticipationService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    // Get all participations of issuer
    getParticipations = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<IParticipation>
        >('/issuer/participations', { params });
        return response.data;
    };
}
