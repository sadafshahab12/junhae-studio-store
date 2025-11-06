import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number | string;
}

const Slider: React.FC<SliderProps> = ({ label, value, ...props }) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 flex justify-between items-center">
        {label}
        <span>{value}</span>
      </label>
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
        {...props}
      />
    </div>
  );
};

export default Slider;