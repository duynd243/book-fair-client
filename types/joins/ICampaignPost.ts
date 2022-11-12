import { IPost } from '../post/IPost';

export interface ICampaignPost {
    id?: number;
    code?: string;
    name?: string;
    address?: string;
    preDate?: Date;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    imageUrl?: string;
    status?: number;
    statusName?: string;
    posts?: IPost[];
}
