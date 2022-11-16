import { AxiosInstance } from 'axios';
import getAxiosClient from '../axiosClient';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import { IOrganization } from '../../types/organization/IOrganization';

export class SystemOrganizationService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getOrganizations$System = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<IOrganization>
        >('admin/organizations', {
            params,
        });
        return response.data;
    };
}
