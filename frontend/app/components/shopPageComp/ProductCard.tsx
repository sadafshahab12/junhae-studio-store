import React from "react";

import Image from "next/image";
import { Product } from "@/app/data/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative text-left">
      <div className="relative w-full h-0 pb-[125%] bg-gray-200 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          width={1000}
          height={1000}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]">
          <button className="w-full px-4 py-3 bg-white/90 text-black text-sm font-semibold rounded-full backdrop-blur-sm  group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-2 translate-y-0">
            View Details
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-semibold text-gray-800">
          <Link href="/">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.tagline}</p>
        <p className="mt-2 text-base font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
