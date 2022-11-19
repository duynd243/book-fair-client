import { NextPage } from 'next';
import AdminLayout from '../../components/Layouts/AdminLayout';
import React from 'react';
import WelcomeBanner from '../../components/Admin/Dashboard/WelcomeBanner';

const DashboardPage: NextPage = () => {
    return (
        <AdminLayout>
            <WelcomeBanner />
        </AdminLayout>
    );
};

export default DashboardPage;
