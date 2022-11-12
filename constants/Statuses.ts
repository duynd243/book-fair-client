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
    static readonly STARTING = {
        id: 1,
        name: 'Starting',
        displayName: 'Đang diễn ra',
    };

    static readonly FINISHED = {
        id: 2,
        name: 'Finished',
        displayName: 'Đã kết thúc',
    };
}

export class ParticipationStatuses {
    static readonly WAITING_APPROVAL = {
        id: 0,
        displayName: 'Chờ phê duyệt',
    };
    static readonly WAITING_ISSUER_ACCEPT = {
        id: 1,
        displayName: 'Chờ nhà phát hành chấp nhận',
    };

    static readonly SYSTEM_APPROVED = {
        id: 2,
        displayName: 'Đã được phê duyệt',
    };
    static readonly SYSTEM_REJECTED = {
        id: 3,
        displayName: 'Yêu tham gia bị từ chối',
    };

    static readonly ISSUER_ACCEPTED = {
        id: 4,
        displayName: 'Nhà phát hành đồng ý',
    };

    static readonly ISSUER_REJECTED = {
        id: 5,
        displayName: 'Nhà phát hành từ chối',
    };
}

export function getCampaignStatusById(id: number): IBaseStatus {
    const status = Object.values(CampaignStatuses).find(
        (status) => status.id === id
    );
    return status;
}
