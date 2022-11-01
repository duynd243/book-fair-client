import { IOrganization } from '../organization/IOrganization';

export interface IOrganizationCampaign {
    id?: number;
    organizationId?: number;
    campaignId?: number;
    address?: string;
    organization?: IOrganization;
}
