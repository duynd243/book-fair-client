export interface IBaseListResponse<T> {
    metadata: {
        page: number;
        size: number;
        total: number;
    };
    data: T[];
}
