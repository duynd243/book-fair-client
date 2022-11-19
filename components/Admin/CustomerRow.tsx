import React from 'react';
import { IUser } from '../../types/user/IUser';
import Image from 'next/image';

import DefaultAvatar from '../../assets/images/default_avatar.png';
import { getFormattedDate } from '../../utils/helper';
import TableData, { noDataLabel } from './TableData';

type Props = {
    customer: IUser;
};

const CustomerRow: React.FC<Props> = ({ customer }) => {
    return (
        <tr>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="text-left">{customer?.code}</div>
            </td>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="flex items-center">
                    <div className="mr-2 h-10 w-10 shrink-0 sm:mr-3">
                        <Image
                            className="rounded-full"
                            src={customer?.imageUrl || DefaultAvatar.src}
                            width="40"
                            height="40"
                            alt={customer?.name || ''}
                        />
                    </div>
                    <div className="font-medium text-slate-800">
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
                    : noDataLabel}
            </TableData>
            <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                {/* Menu button */}
                <button className="rounded-full text-slate-400 hover:text-slate-500">
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
