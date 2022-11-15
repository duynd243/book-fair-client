import React from 'react';
import { IUser } from '../../types/user/IUser';
import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import CustomerRow from './CustomerRow';

const TableHeader = ({ label }: { label: string }) => {
    return (
        <th className="tw-w-px tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
            <span className="tw-text-left tw-font-semibold">{label}</span>
        </th>
    );
};

type Props = {
    data: IBaseListResponse<IUser>;
};

const CustomerTable: React.FC<Props> = ({ data }) => {
    const metadata = data?.metadata;
    const customers = data?.data;
    return (
        <div className="tw-relative tw-rounded-sm tw-border tw-border-slate-200 tw-bg-white tw-shadow-lg">
            <header className="tw-px-5 tw-py-4">
                <h2 className="tw-font-semibold tw-text-slate-800">
                    Tổng số khách hàng{' '}
                    <span className="tw-font-medium tw-text-slate-400">
                        {metadata?.total}
                    </span>
                </h2>
            </header>
            <div>
                {/* Table */}
                <div className="tw-overflow-x-auto">
                    <table className="tw-w-full tw-table-auto">
                        {/* Table header */}
                        <thead className="tw-border-t tw-border-b tw-border-slate-200 tw-bg-slate-50 tw-text-xs tw-font-semibold tw-uppercase tw-text-slate-500">
                            <tr>
                                <th className="tw-w-px tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                                    <div className="tw-flex tw-items-center">
                                        <label className="tw-inline-flex">
                                            <span className="tw-sr-only">
                                                Select all
                                            </span>
                                            <input
                                                className="tw-form-checkbox"
                                                type="checkbox"
                                                checked={false}
                                                onChange={() => {}}
                                            />
                                        </label>
                                    </div>
                                </th>
                                <TableHeader label={'Code'} />
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
                        <tbody className="tw-divide-y tw-divide-slate-200 tw-text-sm">
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