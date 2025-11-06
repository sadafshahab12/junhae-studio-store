import React from "react";

interface EmptyCartProps {
  onShopClick: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onShopClick }) => {
  return (
    <div className="text-center py-24">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-24 w-24 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">
        Your cart is feeling empty
      </h3>
      <p className="mt-2 text-base text-gray-500">
        Find something {`you'll`} love.
      </p>
      <div className="mt-6">
        <button
          onClick={onShopClick}
          type="button"
          className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
