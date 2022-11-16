import { IOrderDetail } from './IOrderDetail';
import { IUser } from '../user/IUser';

export interface IOrder {
    id?: string;
    customerId?: string;
    campaignId?: number;
    orderDate?: string;
    shippedDate?: string;
    requiredDate?: string;
    receivedDate?: string;
    total?: number;
    status?: number;
    statusName?: string;
    payment?: string;
    freight?: number;
    address?: string;
    customer?: IUser;
    orderDetails?: IOrderDetail[];
}
