import React from 'react';

const TableHeader = ({ label }: { label: string }) => {
    return (
        <th className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
            <span className="text-left font-semibold">{label}</span>
        </th>
    );
};

export default TableHeader;
