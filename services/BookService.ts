import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { ICampaignBook } from '../types/joins/ICampaignBook';

export class BookService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    // getCampaignBookById = async (id: any) => {
    //     const response = await this.axiosClient.get<ICampaignBook>(
    //         '/campaignbooks'
    //     );
    //     return response.data;
    // };
}
