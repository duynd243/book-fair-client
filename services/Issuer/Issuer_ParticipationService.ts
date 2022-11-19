import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { IParticipation } from '../../types/participation/IParticipation';

export class IssuerParticipationService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    acceptInvitation$Issuer = async (participationId: any) => {
        const response = await this.axiosClient.put<IParticipation>(
            `/issuer/participations/acceptance/${participationId}`
        );
        return response.data;
    };

    declineInvitation$Issuer = async (participationId: any) => {
        const response = await this.axiosClient.put<IParticipation>(
            `/issuer/participations/rejection/${participationId}`
        );
        return response.data;
    };
}
