import React from "react";

import SocialShare from "./SocialShare";
import { BlogProduct } from "@/app/data/types";
import Image from "next/image";

interface ArticleContentProps {
  content: string;
  shopTheLook: BlogProduct[];
}

const ShopTheLook: React.FC<{ products: BlogProduct[] }> = ({ products }) => (
  <div className="my-12 p-8 bg-stone-100 rounded-lg">
    <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
      Shop the Look
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <a href="#" key={product.name} className="group text-center">
          <div className="overflow-hidden rounded-md">
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover aspect-4/5 transition-transform duration-500 ease-in-out group-hover:scale-105"
              width={3000}
              height={3000}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black transition-colors">
            {product.name}
          </p>
        </a>
      ))}
    </div>
  </div>
);

const ArticleContent: React.FC<ArticleContentProps> = ({
  content,
  shopTheLook,
}) => {
  return (
    <article className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>

          {shopTheLook && shopTheLook.length > 0 && (
            <ShopTheLook products={shopTheLook} />
          )}

          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We hope this inspires you to find beauty in simplicity and to
              create a style that is uniquely, unapologetically you. Explore our
              collections and start printing your vibe today.
            </p>
          </div>

          <SocialShare />
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;
