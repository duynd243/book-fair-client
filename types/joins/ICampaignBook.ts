import { IParticipation } from '../participation/IParticipation';
import { IBookResponse } from '../response/IBookResponse';

export interface ICampaignBook {
    id?: number;
    participationId?: number;
    bookId?: number;
    postId?: number;
    saleQuantity?: number;
    discount?: number;
    coverPrice?: number;
    participation?: IParticipation;
    book?: IBookResponse;
}