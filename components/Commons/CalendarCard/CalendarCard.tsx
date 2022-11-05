import React from 'react';
import { getFormattedDate } from 'utils/helper';

type Props = {
    title?: string;
    dateStr?: string;
};

const CalendarCard: React.FC<Props> = ({ title, dateStr }) => {
    return (
        <div
            title={title ? title : ''}
            className="tw-flex tw-h-fit tw-min-w-[65px] tw-select-none tw-flex-col tw-items-center  tw-justify-center tw-overflow-hidden tw-rounded tw-bg-slate-50 tw-text-center  tw-text-sm tw-text-slate-600"
        >
            {/* Thứ */}
            <div className="tw-w-full tw-bg-indigo-600 tw-py-1 tw-text-xs tw-font-medium tw-text-white">
                {getFormattedDate(dateStr).dayOfWeek}
            </div>
            <div>
                {/* Ngày */}
                <div className="tw-text-lg tw-font-semibold tw-text-slate-800">
                    {getFormattedDate(dateStr).day}
                </div>
                {/* Tháng */}
                <div className="tw-mb-2 tw-text-xs tw-uppercase">
                    Thg. {getFormattedDate(dateStr).month}
                </div>
            </div>
        </div>
    );
};

export default CalendarCard;
