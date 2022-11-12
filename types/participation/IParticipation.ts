import { IUser } from '../user/IUser';

export interface IParticipation {
    id?: number;
    campaignId?: number;
    issuerId?: string;
    invitedDate?: Date;
    updatedDate?: Date;
    status?: number;
    statusName?: string;
    note?: string;
    issuer?: IUser;
}
