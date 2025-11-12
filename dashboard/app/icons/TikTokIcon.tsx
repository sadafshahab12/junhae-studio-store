import React from 'react';

const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
    {...props}
  >
    <path d="M16.5 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"></path>
    <path d="M12 11v10"></path>
    <path d="M8 16a4 4 0 1 0 8 0"></path>
  </svg>
);

export default TikTokIcon;
