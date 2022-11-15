import React from 'react';
import { IUser } from '../../types/user/IUser';
import Image from 'next/image';

import DefaultAvatar from '../../assets/images/default_avatar.png';
import { getFormattedDate } from '../../utils/helper';

const TableData = ({
    alignClass = 'tw-text-left',
    children,
}: {
    alignClass?: 'tw-text-left' | 'tw-text-center' | 'tw-text-right';
    children: React.ReactNode;
}) => {
    return (
        <td className="tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
            <div className={alignClass}>{children}</div>
        </td>
    );
};

type Props = {
    customer: IUser;
};

const CustomerRow: React.FC<Props> = ({ customer }) => {
    const noDataLabel = 'Chưa có dữ liệu';
    return (
        <tr>
            <td className="tw-w-px tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                <div className="tw-flex tw-items-center">
                    <label className="tw-inline-flex">
                        <span className="tw-sr-only">Select</span>
                        <input
                            id={customer?.id}
                            className="tw-form-checkbox"
                            type="checkbox"
                            onChange={() => {}}
                            checked={false}
                        />
                    </label>
                </div>
            </td>

            <td className="tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                <div className="tw-text-left">{customer?.code}</div>
            </td>
            <td className="tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                <div className="tw-flex tw-items-center">
                    <div className="shrink-0 tw-mr-2 tw-h-10 tw-w-10 sm:tw-mr-3">
                        <Image
                            className="tw-rounded-full"
                            src={customer?.imageUrl || DefaultAvatar.src}
                            width="40"
                            height="40"
                            alt={customer?.name || ''}
                        />
                    </div>
                    <div className="text-slate-800 tw-font-medium">
                        {customer.name}
                    </div>
                </div>
            </td>

            <TableData>{customer?.email}</TableData>
            <TableData alignClass={'tw-text-center'}>
                {customer?.phoneNumber || noDataLabel}
            </TableData>
            <TableData alignClass={'tw-text-center'}>
                {customer?.address || noDataLabel}
            </TableData>
            <TableData alignClass={'tw-text-center'}>
                {customer?.dob
                    ? getFormattedDate(customer?.dob).withoutDayOfWeek
                    : 'Chưa có dữ liệu'}
            </TableData>
            <TableData>
                {customer?.organizations
                    ? customer?.organizations?.map((o) => o?.name).join(', ')
                    : 'Chưa có dữ liệu'}
            </TableData>
            <td className="tw-w-px tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                {/* Menu button */}
                <button className="text-slate-400 hover:text-slate-500 tw-rounded-full">
                    <span className="tw-sr-only">Menu</span>
                    <svg
                        className="tw-h-8 tw-w-8 tw-fill-current"
                        viewBox="0 0 32 32"
                    >
                        <circle cx="16" cy="16" r="2" />
                        <circle cx="10" cy="16" r="2" />
                        <circle cx="22" cy="16" r="2" />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default CustomerRow;
