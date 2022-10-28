import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';

export class CampaignService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }
}
