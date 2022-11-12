import { IPost } from '../post/IPost';
import { IParticipation } from '../participation/IParticipation';
import { IBookResponse } from './IBookResponse';

export interface IPostResponse extends IPost {
    isValid?: boolean;
    campaignBooks: {
        id?: number;
        participationId?: number;
        bookId?: number;
        postId?: number;
        saleQuantity?: number;
        discount?: number;
        coverPrice?: number;
        participation?: IParticipation;
        book?: IBookResponse;
    }[];
}
