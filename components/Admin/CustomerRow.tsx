import React from 'react';
import { IUser } from '../../types/user/IUser';
import Image from 'next/image';

import DefaultAvatar from '../../assets/images/default_avatar.png';
import { getFormattedDate } from '../../utils/helper';

const TableData = ({
    alignClass = 'text-left',
    children,
}: {
    alignClass?: 'text-left' | 'text-center' | 'text-right';
    children: React.ReactNode;
}) => {
    return (
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
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
            <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="flex items-center">
                    <label className="inline-flex">
                        <span className="sr-only">Select</span>
                        <input
                            id={customer?.id}
                            className="form-checkbox"
                            type="checkbox"
                            onChange={() => {}}
                            checked={false}
                        />
                    </label>
                </div>
            </td>

            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="text-left">{customer?.code}</div>
            </td>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="flex items-center">
                    <div className="shrink-0 mr-2 h-10 w-10 sm:mr-3">
                        <Image
                            className="rounded-full"
                            src={customer?.imageUrl || DefaultAvatar.src}
                            width="40"
                            height="40"
                            alt={customer?.name || ''}
                        />
                    </div>
                    <div className="text-slate-800 font-medium">
                        {customer.name}
                    </div>
                </div>
            </td>

            <TableData>{customer?.email}</TableData>
            <TableData alignClass={'text-center'}>
                {customer?.phoneNumber || noDataLabel}
            </TableData>
            <TableData alignClass={'text-center'}>
                {customer?.address || noDataLabel}
            </TableData>
            <TableData alignClass={'text-center'}>
                {customer?.dob
                    ? getFormattedDate(customer?.dob).withoutDayOfWeek
                    : 'Chưa có dữ liệu'}
            </TableData>
            <TableData>
                {customer?.organizations
                    ? customer?.organizations?.map((o) => o?.name).join(', ')
                    : 'Chưa có dữ liệu'}
            </TableData>
            <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                {/* Menu button */}
                <button className="text-slate-400 hover:text-slate-500 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
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
