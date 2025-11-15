import React from "react";

import DashboardOverview from "../components/adminPageComp/DashboardOverview";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
        {/* The actual page content is handled by Next.js routing */}
        {/* If this is your overview page, you can render DashboardOverview here */}
        <DashboardOverview />
      </main>
    </div>
  );
};

export default DashboardPage;
