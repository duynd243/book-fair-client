import { IParticipation } from '../participation/IParticipation';
import { IOrganizationCampaign } from '../joins/IOrganizationCampaign';

export interface ICampaign {
    id?: number;
    code?: string;
    name?: string;
    address?: string;
    preDate?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    imageUrl?: string;
    status?: number;
    statusName?: string;
    participations?: IParticipation[];
    organizationCampaigns?: IOrganizationCampaign[];
}
