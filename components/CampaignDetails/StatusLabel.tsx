import React from 'react';
import {
    CampaignStatuses,
    getCampaignStatusById,
} from '../../constants/Statuses';

type Props = {
    statusId?: number;
};

const StatusLabel: React.FC<Props> = ({ statusId }) => {
    let backgroundColor = 'tw-bg-green-100';
    let textColor = 'tw-text-green-800';
    const status = getCampaignStatusById(statusId || 0);

    switch (status.id) {
        case CampaignStatuses.STARTING.id:
            backgroundColor = 'tw-bg-green-100';
            textColor = 'tw-text-green-800';
            break;
        case CampaignStatuses.NOT_STARTED.id:
            backgroundColor = 'tw-bg-yellow-100';
            textColor = 'tw-text-yellow-800';
            break;
        case CampaignStatuses.FINISHED.id:
            backgroundColor = 'tw-bg-red-100';
            textColor = 'tw-text-red-800';
            break;
    }
    return (
        <div
            className={`${backgroundColor} ${textColor} tw-inline-flex tw-rounded-full tw-px-3 tw-py-1 tw-text-center tw-text-xs tw-font-medium tw-uppercase`}
        >
            {statusId !== undefined
                ? getCampaignStatusById(statusId).displayName
                : 'N/A'}
        </div>
    );
};

export default StatusLabel;
