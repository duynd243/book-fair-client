export interface IBaseStatus {
    id: number;
    name: string;
    displayName: string;
}

export class CampaignStatuses {
    static readonly NOT_STARTED = {
        id: 0,
        name: 'NotStarted',
        displayName: 'Chưa bắt đầu',
    };

    static readonly WAITING = {
        id: 1,
        name: 'Waiting',
        displayName: 'Chờ thêm issuers',
    };

    static readonly STARTING = {
        id: 2,
        name: 'Starting',
        displayName: 'Đang diễn ra',
    };

    static readonly FINISHED = {
        id: 3,
        name: 'Finished',
        displayName: 'Đã kết thúc',
    };
}

export function getCampaignStatusById(id: number): IBaseStatus {
    const status = Object.values(CampaignStatuses).find(
        (status) => status.id === id
    );
    return status;
}
