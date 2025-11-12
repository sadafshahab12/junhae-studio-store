"use client"
import CheckIcon from '@/app/icons/CheckIcon';
import React, { useEffect } from 'react';


interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center gap-4 px-6 py-4 bg-gray-900 text-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out
        ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="p-1 bg-green-500 rounded-full">
        <CheckIcon className="w-4 h-4 text-white" />
      </div>
      <span>{message}</span>
    </div>
  );
};

export default Toast;