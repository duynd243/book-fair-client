import { ICampaign } from '../campaign/ICampaign';
import { IOrganization } from '../organization/IOrganization';

export interface IOrganizationResponse extends IOrganization {
    campaigns?: ICampaign[];
}
