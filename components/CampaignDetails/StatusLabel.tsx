import React from 'react';
import {
    CampaignStatuses,
    getCampaignStatusById,
} from '../../constants/Statuses';

type Props = {
    statusId?: number;
};

const StatusLabel: React.FC<Props> = ({ statusId }) => {
    let backgroundColor = 'bg-green-100';
    let textColor = 'text-green-800';
    const status = getCampaignStatusById(statusId || 0);

    switch (status.id) {
        case CampaignStatuses.STARTING.id:
            backgroundColor = 'bg-green-100';
            textColor = 'text-green-800';
            break;
        case CampaignStatuses.NOT_STARTED.id:
            backgroundColor = 'bg-yellow-100';
            textColor = 'text-yellow-800';
            break;
        case CampaignStatuses.FINISHED.id:
            backgroundColor = 'bg-red-100';
            textColor = 'text-red-800';
            break;
    }
    return (
        <div
            className={`${backgroundColor} ${textColor} inline-flex rounded-full px-3 py-1 text-center text-xs font-medium uppercase`}
        >
            {statusId !== undefined
                ? getCampaignStatusById(statusId).displayName
                : 'N/A'}
        </div>
    );
};

export default StatusLabel;
