import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  change: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon, change, changeType = 'neutral' }) => {
  const changeColor = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-500 dark:text-gray-400'
  }[changeType];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-4">
          <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
      <p className={`text-sm mt-4 ${changeColor}`}>
        {change}
      </p>
    </div>
  );
};

export default StatCard;