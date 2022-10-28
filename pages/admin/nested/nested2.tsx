import AdminLayout from '../../../components/Layouts/AdminLayout';

import { Fragment } from 'react';
import { Tab } from '@headlessui/react';

const Nested2 = () => {
    const tabs = [
        {
            label: 'Tab 1',
            content: 'Tab 1 content',
        },
        {
            label: 'Tab 2',
            content: 'Tab 2 content',
        },
        {
            label: 'Tab 3',
            content: 'Tab 3 content',
        },
    ];
    return (
        <AdminLayout>
            <div>
                <Tab.Group>
                    <Tab.List>
                        {tabs.map((tab, index) => {
                            return (
                                <Tab key={index} as={Fragment}>
                                    {(props) => (
                                        <button
                                            className={`tw-rounded tw-py-2 tw-px-4 tw-outline-none ${
                                                props.selected &&
                                                'tw-bg-violet-500 tw-font-medium tw-text-white'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    )}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                    <Tab.Panels>
                        {tabs.map((tab, index) => (
                            <Tab.Panel key={index}>{tab.content}</Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </AdminLayout>
    );
};

export default Nested2;
