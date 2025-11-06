"use client"
import ChevronDownIcon from '@/app/icons/ChevronDownIcon';
import React, { useState, ReactNode } from 'react';


interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4"
        aria-expanded={isOpen}
      >
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm text-gray-600 space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
