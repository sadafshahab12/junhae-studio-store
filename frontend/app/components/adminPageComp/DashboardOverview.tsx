import React from "react";
import StatCard from "./StatCard";
import { CUSTOMERS, ORDERS, PRODUCTS } from "@/app/data/constants";
import PackageIcon from "@/app/icons/PackageIcon";
import ShoppingCartIcon from "@/app/icons/ShoppingCartIcon";
import UsersIcon from "@/app/icons/UsersIcon";

const DashboardOverview: React.FC = () => {
  // const totalSales = ORDERS.reduce(
  //   (sum, order) => (order.status !== "Cancelled" ? sum + order.total : sum),
  //   0
  // );

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Products"
          value={PRODUCTS.length.toString()}
          Icon={PackageIcon}
          change="+2 since last month"
        />
        <StatCard
          title="Total Orders"
          value={ORDERS.length.toString()}
          Icon={ShoppingCartIcon}
          change="+5 since last month"
          changeType="positive"
        />
        <StatCard
          title="Active Customers"
          value={CUSTOMERS.length.toString()}
          Icon={UsersIcon}
          change="-1 since last month"
          changeType="negative"
        />
      </div>
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Sales
        </h3>
        {/* In a real app, this would be a chart component like Recharts or Chart.js */}
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            Sales chart placeholder
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
