import React from "react";

const CartLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="cart-loader">
        <svg
          className="cart-body"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.831a.75.75 0 00-.66-1.11H6.088a.75.75 0 00-.662 1.11l1.823 6.831z"
          />
        </svg>
        <div className="wheel wheel-1"></div>
        <div className="wheel wheel-2"></div>
      </div>
      <p className="text-gray-500 font-medium tracking-wider animate-pulse">
        Loading Your Cart...
      </p>
    </div>
  );
};

export default CartLoader;
