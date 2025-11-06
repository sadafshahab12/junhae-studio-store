import React from 'react';

const PaletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.477-1.122-.297-.287-.703-.465-1.17-.465-1.97 0-3.57-1.6-3.57-3.57s1.6-3.57 3.57-3.57c1.97 0 3.57 1.6 3.57 3.57 0 .926.746 1.688 1.688 1.688 1.97 0 3.57-1.6 3.57-3.57s-1.6-3.57-3.57-3.57c-.926 0-1.688.746-1.688 1.688 0 .437.18.835.477 1.122.297.287.703.465 1.17.465 1.97 0 3.57 1.6 3.57 3.57s-1.6 3.57-3.57 3.57c-.926 0-1.688-.746-1.688-1.688V12c0-5.5-4.5-10-10-10z" />
  </svg>
);

export default PaletteIcon;