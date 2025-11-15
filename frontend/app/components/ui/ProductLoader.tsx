import ShoppingBagIcon from "@/app/icons/ShoppingBagIcon";
import React from "react";

interface ProductLoaderProps {
  text?: string;
}

const ProductLoader: React.FC<ProductLoaderProps> = ({
  text = "Finding your perfect fit...",
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-8"
      style={{ minHeight: "300px" }}
    >
      <div className="product-loader">
        <ShoppingBagIcon className="bag-icon" />
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
        <div className="particle p5"></div>
        <div className="particle p6"></div>
      </div>
      <p className="text-gray-500 font-medium tracking-wider text-center animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default ProductLoader;
