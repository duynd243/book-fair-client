import Sidebar from 'components/Admin/Sidebar';
import React, { useState } from 'react';
import Header from '../Admin/Header';

type Props = {
    children: React.ReactNode;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    return (
        <div className="tw-flex tw-h-screen tw-overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            {/* Content */}
            <div className="tw-relative tw-flex tw-flex-1 tw-flex-col tw-overflow-y-auto tw-overflow-x-hidden tw-bg-slate-50">
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main>
                    <div
                        className={
                            'tw-mx-auto tw-w-full tw-max-w-9xl tw-px-4 tw-py-8 sm:tw-px-6 lg:tw-px-8'
                        }
                    >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
export default AdminLayout;
