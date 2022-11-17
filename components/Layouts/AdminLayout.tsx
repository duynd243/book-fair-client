import Sidebar from 'components/Admin/Sidebar';
import React, { useState } from 'react';
import Header from '../Admin/Header';

type Props = {
    children: React.ReactNode;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            {/* Content */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-slate-50">
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main>
                    <div
                        className={
                            'mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8'
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
