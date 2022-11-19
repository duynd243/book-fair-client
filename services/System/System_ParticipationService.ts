import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IParticipation } from '../../types/participation/IParticipation';

export class SystemParticipationService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    createParticipation$System = async (data: any) => {
        const response = await this.axiosClient.post<IParticipation>(
            '/admin/participations',
            data
        );
        return response.data;
    };

    rejectRequest$System = async (participationId: any) => {
        const response = await this.axiosClient.put<IParticipation>(
            `/admin/participations/rejection/${participationId}`
        );
        return response.data;
    };

    approveRequest$System = async (participationId: any) => {
        const response = await this.axiosClient.put<IParticipation>(
            `/admin/participations/approval/${participationId}`
        );
        return response.data;
    };

    cancelInvitation$System = async (participationId: any) => {
        const response = await this.axiosClient.put<IParticipation>(
            `/admin/participations/cancellation/${participationId}`
        );
        return response.data;
    };
}
