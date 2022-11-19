import React from 'react';
import { IUser } from '../../types/user/IUser';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import CustomerRow from './CustomerRow';
import TableHeader from './TableHeader';

type Props = {
    data: IBaseListResponse<IUser>;
};

const CustomerTable: React.FC<Props> = ({ data }) => {
    const metadata = data?.metadata;
    const customers = data?.data;
    return (
        <div className="relative rounded-sm border border-slate-200 bg-white shadow-lg">
            <header className="px-5 py-4">
                <h2 className="font-semibold text-slate-800">
                    Tổng số khách hàng{' '}
                    <span className="font-medium text-slate-400">
                        {metadata?.total}
                    </span>
                </h2>
            </header>
            <div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        {/* Table header */}
                        <thead className="border-t border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                            <tr>
                                <TableHeader label={'Mã số'} />
                                <TableHeader label={'Họ Tên'} />
                                <TableHeader label={'Email'} />
                                <TableHeader label={'Số điện thoại'} />
                                <TableHeader label={'Địa chỉ'} />
                                <TableHeader label={'Ngày sinh'} />
                                <TableHeader label={'Tổ chức'} />
                                <TableHeader label={''} />
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {customers?.map((customer) => {
                                return (
                                    <CustomerRow
                                        key={customer.id}
                                        customer={customer}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerTable;
