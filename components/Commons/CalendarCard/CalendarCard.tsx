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
            className="flex h-fit min-w-[65px] select-none flex-col items-center  justify-center overflow-hidden rounded bg-slate-50 text-center  text-sm text-slate-600"
        >
            {/* Thứ */}
            <div className="w-full bg-indigo-600 py-1 text-xs font-medium text-white">
                {getFormattedDate(dateStr).dayOfWeek}
            </div>
            <div>
                {/* Ngày */}
                <div className="text-lg font-semibold text-slate-800">
                    {getFormattedDate(dateStr).day}
                </div>
                {/* Tháng */}
                <div className="mb-2 text-xs uppercase">
                    Thg. {getFormattedDate(dateStr).month}
                </div>
            </div>
        </div>
    );
};

export default CalendarCard;
