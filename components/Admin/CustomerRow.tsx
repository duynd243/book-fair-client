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
        <td className="tw-px-2 first:tw-pl-5 last:tw-pr-5 tw-py-3 tw-whitespace-nowrap">
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
            <td className="tw-px-2 first:tw-pl-5 last:tw-pr-5 tw-py-3 tw-whitespace-nowrap tw-w-px">
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

            <td className="tw-px-2 first:tw-pl-5 last:tw-pr-5 tw-py-3 tw-whitespace-nowrap">
                <div className="tw-text-left">{customer?.code}</div>
            </td>
            <td className="tw-px-2 first:tw-pl-5 last:tw-pr-5 tw-py-3 tw-whitespace-nowrap">
                <div className="tw-flex tw-items-center">
                    <div className="tw-w-10 tw-h-10 shrink-0 tw-mr-2 sm:tw-mr-3">
                        <Image
                            className="tw-rounded-full"
                            src={customer?.imageUrl || DefaultAvatar.src}
                            width="40"
                            height="40"
                            alt={customer?.name || ''}
                        />
                    </div>
                    <div className="tw-font-medium text-slate-800">
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
            <td className="tw-px-2 first:tw-pl-5 last:tw-pr-5 tw-py-3 tw-whitespace-nowrap tw-w-px">
                {/* Menu button */}
                <button className="text-slate-400 hover:text-slate-500 tw-rounded-full">
                    <span className="tw-sr-only">Menu</span>
                    <svg
                        className="tw-w-8 tw-h-8 tw-fill-current"
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
