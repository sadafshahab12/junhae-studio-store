import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 text-gray-400' })}
        </div>
      )}
      <input
        ref={ref}
        {...props}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-800 sm:text-sm py-3 pr-3 ${icon ? 'pl-10' : 'pl-4'}`}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
