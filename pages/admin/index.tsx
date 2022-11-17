import { NextPage } from 'next';
import AdminLayout from '../../components/Layouts/AdminLayout';
import { Badge, Datepicker } from '@tremor/react';
import React from 'react';
import WelcomeBanner from '../../components/Admin/Dashboard/WelcomeBanner';

const DashboardPage: NextPage = () => {
    return (
        <AdminLayout>
            <WelcomeBanner />
            <Badge
                text="Hello"
                color="blue"
                size="sm"
                icon={undefined}
                tooltip=""
                marginTop="mt-0"
            />
            <div className={'flex items-center justify-end'}>
                <Datepicker
                    placeholder="Select..."
                    enableRelativeDates={false}
                    handleSelect={undefined}
                    defaultStartDate={null}
                    defaultEndDate={null}
                    minDate={null}
                    maxDate={null}
                    color="blue"
                    maxWidth="max-w-xs"
                    marginTop="mt-2"
                />
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
