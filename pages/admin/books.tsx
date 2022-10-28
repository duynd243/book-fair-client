import AdminLayout from 'components/Layouts/AdminLayout';
import { NextPage } from 'next';
import React from 'react';

const AdminBooksPage: NextPage = () => {
    // 100 numbers array
    const a = Array.from(Array(100).keys());

    return (
        <AdminLayout>
            <ul>
                {a.map((item) => {
                    return <li key={item}>{item}</li>;
                })}
            </ul>
        </AdminLayout>
    );
};

export default AdminBooksPage;
