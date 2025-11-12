import React from 'react';

const CompassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1} 
        stroke="currentColor" 
        className="w-16 h-16 text-gray-300"
        {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-6.364-.636l1.591-1.591M20.364 3.636l-1.591 1.591M3.636 3.636l1.591 1.591M13.5 12l3.375 3.375" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12L7.125 8.625" />
    </svg>
);

export default CompassIcon;