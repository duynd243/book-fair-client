import React from 'react';
import { IBookResponse } from '../../types/response/IBookResponse';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';

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
    book: IBookResponse;
};

const BookRow: React.FC<Props> = ({ book }) => {
    const noDataLabel = 'Chưa có dữ liệu';
    return (
        <tr>
            <td className="tw-w-px tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                <div className="tw-flex tw-items-center">
                    <label className="tw-inline-flex">
                        <span className="tw-sr-only">Select</span>
                        <input
                            id={String(book?.id)}
                            className="tw-form-checkbox"
                            type="checkbox"
                            onChange={() => {}}
                            checked={false}
                        />
                    </label>
                </div>
            </td>

            <td className="tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                <div className="tw-text-left">{book?.code}</div>
            </td>
            <td className="tw-whitespace-nowrap tw-px-2 tw-py-3 first:tw-pl-5 last:tw-pr-5">
                <div className="tw-flex tw-items-center">
                    <div className="shrink-0 tw-mr-2 tw-h-[100px] tw-w-[64px] sm:tw-mr-3">
                        <Image
                            className="tw-rounded"
                            src={book?.imageUrl || DefaultAvatar.src}
                            width="80"
                            height="100"
                            alt={book?.name || ''}
                        />
                    </div>
                    <div className="text-slate-800 tw-font-medium">
                        {book.name}
                    </div>
                </div>
            </td>

            <TableData>{book?.price}</TableData>
            <TableData alignClass={'tw-text-center'}>
                {book?.publisher?.name || noDataLabel}
            </TableData>
            <TableData alignClass={'tw-text-center'}>
                {book?.releasedYear || noDataLabel}
            </TableData>
            <TableData alignClass={'tw-text-center'}>
                {book?.page || noDataLabel}
            </TableData>
            <TableData>{book?.isbn10 || noDataLabel}</TableData>
            <TableData>{book?.isbn13 || noDataLabel}</TableData>
            <TableData>{book?.size || noDataLabel}</TableData>
            <TableData>
                {book?.authorBooks?.map((a) => a.author?.name).join(', ') ||
                    noDataLabel}
            </TableData>
            <TableData>{book?.category?.name || noDataLabel}</TableData>
            <TableData>{book?.language || noDataLabel}</TableData>
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

export default BookRow;
