import { IBaseListResponse } from '../../types/response/IBaseListResponse';
import React from 'react';
import { IBookResponse } from '../../types/response/IBookResponse';
import BookRow from './BookRow';
import TableHeader from './TableHeader';

type Props = {
    data: IBaseListResponse<IBookResponse>;
};

const BookTable: React.FC<Props> = ({ data }) => {
    const metadata = data?.metadata;
    const books = data?.data;
    return (
        <div className="relative rounded-sm border border-slate-200 bg-white shadow-lg">
            <header className="px-5 py-4">
                <h2 className="font-semibold text-slate-800">
                    Tổng số sách{' '}
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
                                <TableHeader label={'Mã sách'} />
                                <TableHeader label={'Tên sách'} />
                                <TableHeader label={'Giá'} />
                                <TableHeader label={'Nhà phát hành'} />
                                <TableHeader label={'Năm phát hành'} />
                                <TableHeader label={'Số trang'} />
                                <TableHeader label={'ISBN10'} />
                                <TableHeader label={'ISBN13'} />
                                <TableHeader label={'Kích cỡ'} />
                                <TableHeader label={'Tác giả'} />
                                <TableHeader label={'Thể loại'} />
                                <TableHeader label={'Ngôn ngữ'} />
                                <TableHeader label={''} />
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {books?.map((book) => {
                                return <BookRow key={book.id} book={book} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookTable;
