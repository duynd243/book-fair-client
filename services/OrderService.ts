import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IOrder } from '../types/order/IOrder';
import { IBaseListResponse } from '../types/response/IBaseListResponse';

export class OrderService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    createPickUpOrder = async (order: IOrder) => {
        const response = await this.axiosClient.post<IOrder>('/orders/pickup', {
            ...order,
        });
        return response.data;
    };

    createShipOrder = async (order: IOrder) => {
        const response = await this.axiosClient.post<IOrder>('/orders/ship', {
            ...order,
        });
        return response.data;
    };

    getOrders = async (params?: any) => {
        const response = await this.axiosClient.get<IBaseListResponse<IOrder>>(
            '/orders',
            { params }
        );
        return response.data;
    };
}
