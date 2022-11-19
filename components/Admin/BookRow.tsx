import React from 'react';
import { IBookResponse } from '../../types/response/IBookResponse';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import TableData, { noDataLabel } from './TableData';
import { getFormattedPrice } from '../../utils/helper';

type Props = {
    book: IBookResponse;
};

const BookRow: React.FC<Props> = ({ book }) => {
    return (
        <tr>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="text-left">{book?.code}</div>
            </td>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="flex items-center">
                    <div className="mr-2 h-[100px] w-[64px] shrink-0 sm:mr-3">
                        <Image
                            className="rounded"
                            src={book?.imageUrl || DefaultAvatar.src}
                            width="80"
                            height="100"
                            alt={book?.name || ''}
                        />
                    </div>
                    <div className="font-medium text-slate-800">
                        {book.name}
                    </div>
                </div>
            </td>

            <TableData>
                {book?.price && getFormattedPrice(book?.price)}
            </TableData>
            <TableData alignClass={'text-center'}>
                {book?.publisher?.name || noDataLabel}
            </TableData>
            <TableData alignClass={'text-center'}>
                {book?.releasedYear || noDataLabel}
            </TableData>
            <TableData alignClass={'text-center'}>
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

export default BookRow;
