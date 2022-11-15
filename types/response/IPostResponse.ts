import { IPost } from '../post/IPost';
import { ICampaignBook } from '../joins/ICampaignBook';
import { ICampaign } from '../campaign/ICampaign';

export interface IPostResponse extends IPost {
    isValid?: boolean;
    campaign?: ICampaign;
    campaignBooks: ICampaignBook[];
}
