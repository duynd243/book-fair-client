import { IParticipation } from '../participation/IParticipation';
import { IBookResponse } from '../response/IBookResponse';
import { IPost } from '../post/IPost';

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
    post?: IPost;
}
