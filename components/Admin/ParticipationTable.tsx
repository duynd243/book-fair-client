import React, { Fragment, useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import ParticipationRow from './ParticipationRow';
import { ICampaign } from '../../types/campaign/ICampaign';
import { Listbox, Transition } from '@headlessui/react';

import { HiCheck, HiSelector } from 'react-icons/hi';
import { ParticipationStatuses } from '../../constants/Statuses';

type Props = {
    campaign: ICampaign | undefined;
};
const ParticipationTable: React.FC<Props> = ({ campaign }) => {
    let statusArr = Object.values(ParticipationStatuses);

    statusArr = statusArr.filter((status) =>
        campaign?.participations?.some(
            (participation) => participation.status === status.id
        )
    );

    statusArr.unshift({
        id: undefined,
        displayName: 'Tất cả',
    });
    const [selected, setSelected] = useState(statusArr[0]);

    const [filteredParticipations, setFilteredParticipations] = useState(
        campaign?.participations
    );

    useEffect(() => {
        if (selected.id === undefined) {
            setFilteredParticipations(campaign?.participations);
        } else {
            setFilteredParticipations(
                campaign?.participations?.filter(
                    (p) => p.status === selected.id
                )
            );
        }
    }, [selected]);

    return (
        <div className="relative mt-4 max-w-3xl rounded-sm border border-slate-200 bg-white shadow-lg">
            <header className="flex justify-between px-5 py-4">
                <h2 className="font-semibold text-slate-800">
                    Số lượng{' '}
                    <span className="font-medium text-slate-400">
                        {filteredParticipations?.length}
                    </span>
                </h2>
                {statusArr.length > 1 && (
                    <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1 min-w-36">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">
                                    {selected.displayName}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <HiSelector
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {statusArr.map((status) => (
                                        <Listbox.Option
                                            key={status?.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? 'bg-indigo-100 text-indigo-900'
                                                        : 'text-gray-900'
                                                }`
                                            }
                                            value={status}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected
                                                                ? 'font-medium'
                                                                : 'font-normal'
                                                        }`}
                                                    >
                                                        {status?.displayName}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                                            <HiCheck
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                )}
            </header>
            <div>
                {/* Table */}
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        {/* Table header */}
                        <thead className="border-t border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                            <tr>
                                <TableHeader label={'Mã số'} />
                                <TableHeader label={'Tên NPH'} />
                                <TableHeader label={'Email'} />
                                <TableHeader label={'Số điện thoại'} />
                                <TableHeader label={'Địa chỉ'} />
                                <TableHeader label={'Trạng thái'} />
                                <TableHeader label={'Ghi chú'} />
                                <TableHeader label={''} />
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {filteredParticipations?.map((participation) => {
                                return (
                                    <ParticipationRow
                                        key={participation.id}
                                        campaign={campaign}
                                        participation={participation}
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

export default ParticipationTable;
