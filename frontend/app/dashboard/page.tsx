"use client"
import AdminHeader from '@/app/components/adminPageComp/AdminHeader';
import CustomersAdmin from '@/app/components/adminPageComp/CustomersAdmin';
import DashboardOverview from '@/app/components/adminPageComp/DashboardOverview';
import OrdersAdmin from '@/app/components/adminPageComp/OrdersAdmin';
import ProductsAdmin from '@/app/components/adminPageComp/ProductsAdmin';
import SettingsAdmin from '@/app/components/adminPageComp/SettingsAdmin';
import Sidebar from '@/app/components/adminPageComp/Sidebar';
import React, { useState } from 'react';


const Admin: React.FC = () => {
    const [activePage, setActivePage] = useState('Overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (activePage) {
            case 'Overview':
                return <DashboardOverview />;
            case 'Products':
                return <ProductsAdmin />;
            case 'Orders':
                return <OrdersAdmin />;
            case 'Customers':
                return <CustomersAdmin />;
            case 'Settings':
                return <SettingsAdmin />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="flex min-h-screen pt-50">
            <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-64">
                <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default Admin;