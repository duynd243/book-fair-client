import AdminSidebar from 'components/Sidebar/AdminSidebar';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="tw-flex">
            <AdminSidebar />
            <div className="tw-h-screen tw-overflow-y-auto tw-flex-1">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
