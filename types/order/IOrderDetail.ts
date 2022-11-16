import { ICampaignBook } from '../joins/ICampaignBook';

export interface IOrderDetail {
    id?: number;
    orderId?: string;
    campaignBookId?: number;
    quantity?: number;
    price?: number;
    campaignBook?: ICampaignBook;
}
